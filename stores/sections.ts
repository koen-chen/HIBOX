import { defineStore } from "pinia"
import { Section } from "./types"

export const useSectionsStore = defineStore('sections', () => {
  const supabase = useSupabase().value

  const currentSection = ref<Section | null>(null)

  const addSection = async (info: Section): Promise<Section | null> => {
    const { data, error } = await supabase
      .from('sections')
      .insert(info)
      .select()

    if (!error) {
      currentSection.value = data[0]
    }

    return currentSection.value
  }

  const updateSection = async (id: number, info: Section): Promise<Section | null> => {
    const { data, error } = await supabase
      .from('sections')
      .update(info)
      .eq('id', id)
      .select()

    if (!error) {
      currentSection.value = data[0]
    }

    return currentSection.value
  }

  const updateOrder = async (templateId: number, info: number[]): Promise<void> => {
    const { data, error } = await supabase
      .from('templates')
      .update({ 'sections_order': info })
      .eq('id', templateId)
      .select()
  }

  return {
    currentSection,
    addSection,
    updateSection,
    updateOrder
  }
})