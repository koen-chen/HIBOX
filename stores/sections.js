import { defineStore } from "pinia"

export const useSectionsStore = defineStore('sections', () => {
  const supabase = useSupabase().value

  const currentSection = ref(null)

  const addSection = async (info) => {
    const { data, error } = await supabase
      .from('sections')
      .insert(info)
      .select()

    if (!error) {
      currentSection.value = data[0]
      sections.value.push(currentSection.value)
    }
  }

  const updateSection = async (id, info) => {
    const { data, error } = await supabase
      .from('sections')
      .update(info)
      .eq('id', id)
      .select()

    if (!error) {
      currentSection.value = data[0]
    }
  }

  const updateOrder = async (templateId, info) => {
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