import { defineStore } from "pinia"
import { SectionType, SectionInsertType, SectionUpdateType } from "~/types"

export const useSectionStore = defineStore('section', () => {
  const supabase = useSupabase().value
  const questionStore = useQuestionStore()

  const sectionList = ref<SectionType[]>([])
  const currentSection = ref<SectionType | null>(null)
  const sectionOrder = ref<number[]>([])

  function $reset() {
    sectionList.value = []
    sectionOrder.value = []
    questionStore.$reset()
  }

  const listSection = async (formId: number): Promise<SectionType[]> => {
    const { data, error } = await supabase
      .from('section')
      .select(`
        *,
        form (
          section_order
        )
      `)
      .eq('form_id', formId)
      .neq('state', 'Delete')

    if (!error) {
      sectionList.value = data

      if (data.length > 0) {
        sectionOrder.value = data[0].form.section_order
      }
    }

    return sectionList.value
  }

  const addSection = async (info: SectionInsertType): Promise<SectionType | null> => {
    const { data, error } = await supabase
      .from('section')
      .insert(info)
      .select()
      .single()

    if (!error) {
      currentSection.value = data

      const order = await getOrder(info.form_id)
      await updateOrder(info.form_id, [...order, data.id])
      sectionList.value.push(data)

      return data
    }

    return currentSection.value
  }

  const updateSection = async (id: number, info: SectionUpdateType): Promise<SectionType | null> => {
    const { data, error } = await supabase
      .from('section')
      .update(info)
      .eq('id', id)
      .select()
      .single()

    if (!error) {
      currentSection.value = data

      sectionList.value = sectionList.value.map(item => {
        if (item.id == data.id) {
          return data
        } else {
          return item
        }
      })
    }

    return currentSection.value
  }

  const deleteSection = async (id: number): Promise<void> => {
    const { data, error } = await supabase
      .from('section')
      .update({ state: 'Delete' })
      .eq('id', id)
      .select()
      .single()

    if (!error) {
      currentSection.value = null

      const order = await getOrder(data.section_id)
      sectionOrder.value = order.filter(item => item == id)
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
      const order = await getOrder(data[0].form_id)
      data.forEach((record) => {
        sectionOrder.value = order.filter(item => item == record.id)
      })

      await updateOrder(data[0].form_id, sectionOrder.value)
    }
  }

  const getOrder = async (formId: number): Promise<number[]> => {
    const { data, error } = await supabase
      .from('from')
      .select('section_order')
      .eq('id', formId)
      .limit(1)
      .single()

    if (!error) {
      sectionOrder.value = data.section_order
    }

    return sectionOrder.value
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
    currentSection,
    listSection,
    addSection,
    updateSection,
    deleteSection,
    deleteSectionBy,
    getOrder,
    updateOrder
  }
})