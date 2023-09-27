import { defineStore, acceptHMRUpdate } from "pinia"
import { SectionInsertType, SectionUpdateType } from "~/types"

export const useSectionStore = defineStore('section', () => {
  const supabase = useSupabase().value
  const formStore = useFormStore()
  const { sectionOrder, sectionList } = storeToRefs(formStore)

  const latestSectionId = ref<number | null>(null)

  const addSection = async (info: SectionInsertType, afterElement?: { id: number, type: string }): Promise<void> => {
    const { data } = await supabase
      .from('section')
      .insert(info)
      .select()
      .maybeSingle()

    if (data) {
      let index = sectionOrder.value.length

      if (afterElement) {
        if (afterElement.type == 'Section') {
          index = sectionOrder.value.findIndex(id => id == afterElement.id) + 1
        } else if (afterElement.type == 'Form') {
          index = 0
        }
      }

      sectionList.value.splice(index, 0, data)
      sectionOrder.value.splice(index, 0, data.id)

      latestSectionId.value = data.id
      await updateSectionOrder(info.form_id, [...sectionOrder.value])
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
      const index = sectionList.value.findIndex(item => item.id == data.id)
      sectionList.value.splice(index, 1, data)
    }
  }

  const deleteSection = async (id: number, formId: number): Promise<void> => {
    sectionList.value = sectionList.value.filter(item => item.id !== id)
    sectionOrder.value = sectionOrder.value.filter(item => item != id)

    await updateSectionOrder(formId, sectionOrder.value)
  }

  const updateSectionOrder = async (formId: number, info: number[]): Promise<void> => {
    const { error } = await supabase
      .from('form')
      .update({ 'section_order': info })
      .eq('id', formId)
      .select()

    if (!error) {
      sectionOrder.value = info
    }
  }

  return {
    latestSectionId,
    addSection,
    updateSection,
    deleteSection,
    updateSectionOrder
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSectionStore, import.meta.hot))
}