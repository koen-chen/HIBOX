import { defineStore } from "pinia"
import { SectionType, SectionInsertType, SectionUpdateType } from "~/types"

export const useSectionStore = defineStore('section', () => {
  const supabase = useSupabase().value
  const questionStore = useQuestionStore()

  const sectionList = ref<SectionType[]>([])
  const sectionOrder = ref<number[]>([])

  const $reset = () => {
    sectionList.value = []
    sectionOrder.value = []

    questionStore.$reset()
  }

  const addSection = async (info: SectionInsertType): Promise<SectionType> => {
    const { data, error } = await supabase
      .from('section')
      .insert(info)
      .select()
      .single()

    if (!error) {
      await updateOrder(info.form_id, [...sectionOrder.value, data.id])
      sectionList.value.push(data)
    }

    return data
  }

  const updateSection = async (id: number, info: SectionUpdateType): Promise<SectionType> => {
    const { data, error } = await supabase
      .from('section')
      .update(info)
      .eq('id', id)
      .select()
      .single()

    if (!error) {
      sectionList.value = sectionList.value.map(item => {
        if (item.id == data.id) {
          return data
        } else {
          return item
        }
      })
    }

    return data
  }

  const deleteSection = async (id: number): Promise<void> => {
    const { data, error } = await supabase
      .from('section')
      .update({ state: 'Delete' })
      .eq('id', id)
      .select()
      .single()

    if (!error) {
      sectionOrder.value = sectionOrder.value.filter(item => item != id)
      await updateOrder(data.form_id, sectionOrder.value)

      await questionStore.deleteQuestionBy({ section_id: id })

      sectionList.value = sectionList.value.filter(item => item.id !== id)
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
    sectionOrder,
    sectionList,
    addSection,
    updateSection,
    deleteSection,
    deleteSectionBy,
    updateOrder
  }
})