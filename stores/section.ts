import { defineStore } from "pinia"
import { SectionType, SectionInsertType, SectionUpdateType } from "~/types"
import { usePrevious } from '@vueuse/core'

export const useSectionStore = defineStore('section', () => {
  const supabase = useSupabase().value
  const questionStore = useQuestionStore()

  const sectionList = ref<SectionType[]>([])
  const sectionOrder = ref<number[]>([])

  const previousSectionList = usePrevious(sectionList)
  const previousSectionOrder = usePrevious(sectionOrder)
  const latestSectionId = ref<number | null>(null)

  const $reset = () => {
    sectionList.value = []
    sectionOrder.value = []

    questionStore.$reset()
  }

  const addSection = async (info: SectionInsertType, afterElement?: { id: number, type: string }): Promise<void> => {
    const { data } = await supabase
      .from('section')
      .insert(info)
      .select()
      .maybeSingle()

    if (data) {
      questionStore.questionList[data.id] = []
      questionStore.questionOrder[data.id] = []

      let index = sectionOrder.value.length

      if (afterElement) {
        if (afterElement.type == 'Section') {
          index = sectionOrder.value.findIndex(id => id == afterElement.id) + 1
        }
      }

      sectionList.value.splice(index, 0, data)
      sectionOrder.value.splice(index, 0, data.id)

      latestSectionId.value = data.id
      await updateOrder(info.form_id, [...sectionOrder.value])
    }
  }

  const updateSection = async (id: number, info: SectionUpdateType): Promise<void> => {
    const { data } = await supabase
      .from('section')
      .update(info)
      .eq('id', id)
      .select()
      .maybeSingle()

    if (data) {
      sectionList.value = sectionList.value.map(item => {
        if (item.id == data.id) {
          return data
        } else {
          return item
        }
      })
    }
  }

  const deleteSection = async (id: number): Promise<void> => {
    sectionList.value = sectionList.value.filter(item => item.id !== id)
    sectionOrder.value = sectionOrder.value.filter(item => item != id)

    const { data } = await supabase
      .from('section')
      .update({ state: 'Delete' })
      .eq('id', id)
      .select()
      .maybeSingle()

    if (data) {
      await updateOrder(data.form_id, sectionOrder.value)

      await questionStore.deleteQuestionBy({ section_id: id })
    } else {
      previousSectionList.value && (sectionList.value = [...previousSectionList.value])
      previousSectionOrder.value && (sectionOrder.value = [...previousSectionOrder.value])
    }
  }

  const deleteSectionBy = async (filters: { [key: string]: string | number }): Promise<void> => {
    let query = supabase.from('section').update({ state: 'Delete' })

    for (const key in filters) {
      query.eq(key, filters[key])
    }

    const { data, error } = await query.select()

    if (!error && data.length > 0) {
      data.forEach((record) => {
        sectionOrder.value = sectionOrder.value.filter(item => item == record.id)
      })

      await updateOrder(data[0].form_id, sectionOrder.value)
    }
  }

  const updateOrder = async (formId: number, info: number[]): Promise<number[]> => {
    const { error } = await supabase
      .from('form')
      .update({ 'section_order': info })
      .eq('id', formId)
      .select()

    if (!error) {
      sectionOrder.value = info
    }

    return sectionOrder.value
  }


  return {
    $reset,
    latestSectionId,
    sectionOrder,
    sectionList,
    addSection,
    updateSection,
    deleteSection,
    deleteSectionBy,
    updateOrder
  }
})