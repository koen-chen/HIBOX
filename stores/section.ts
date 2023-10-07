import { defineStore, acceptHMRUpdate } from "pinia"
import { SectionInsertType, SectionUpdateType } from "~/types"

export const useSectionStore = defineStore('section', () => {
  const baas = useBaas().value
  const formStore = useFormStore()
  const { sectionOrder, sectionList } = storeToRefs(formStore)

  const latestSectionId = ref<string | null>(null)

  const addSection = async (info: SectionInsertType, afterElement?: { id: string, type: string }): Promise<void> => {
    const { data } = await baas.addRecord('section', info)

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

  const updateSection = async (id: string, info: SectionUpdateType): Promise<void> => {
    const { data } = await baas.updateRecord('section', id, info)

    if (data) {
      const index = sectionList.value.findIndex(item => item.id == data.id)
      sectionList.value.splice(index, 1, data)
    }
  }

  const deleteSection = async (id: string, formId: string): Promise<void> => {
    sectionList.value = sectionList.value.filter(item => item.id !== id)
    sectionOrder.value = sectionOrder.value.filter(item => item != id)

    await updateSectionOrder(formId, sectionOrder.value)
  }

  const updateSectionOrder = async (formId: string, info: string[]): Promise<void> => {
    const { error } = await baas.updateOrder('form', formId, { 'section_order': info })

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