import { defineStore } from "pinia"
import { Section, SectionUpdate } from "@/types"

export const useSectionStore = defineStore('section', () => {
  const supabase = useSupabase().value

  const sections = ref<Section[]>([])
  const currentSection = ref<Section | null>(null)

  const fetchSections = async (templateId: number): Promise<Section[] | null> => {
    const { data, error } = await supabase
      .from('section')
      .select()
      .eq('template_id', templateId)

    if (!error) {
      sections.value = data
      return sections.value
    } else {
      return null
    }
  }

  const addSection = async (info: SectionUpdate): Promise<Section | null> => {
    const { data, error } = await supabase
      .from('section')
      .insert(info)
      .select()

    if (!error) {
      currentSection.value = data[0]
      return currentSection.value
    } else {
      return null
    }
  }

  const updateSection = async (id: number, info: SectionUpdate): Promise<Section | null> => {
    const { data, error } = await supabase
      .from('section')
      .update(info)
      .eq('id', id)
      .select()

    if (!error) {
      currentSection.value = data[0]
      return currentSection.value
    } else {
      return null
    }
  }

  const deleteSection = async (id: number): Promise<void> => {
    const { data, error } = await supabase
      .from('section')
      .delete()
      .eq('id', id)
  }

  const updateOrder = async (templateId: number, info: number[]): Promise<void> => {
    const { data, error } = await supabase
      .from('template')
      .update({ 'section_order': info })
      .eq('id', templateId)
      .select()
  }

  return {
    sections,
    currentSection,
    fetchSections,
    addSection,
    updateSection,
    deleteSection,
    updateOrder
  }
})