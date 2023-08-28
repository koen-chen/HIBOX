import { defineStore } from 'pinia'


export const useTemplatesStore = defineStore('templates', () => {
  const supabase = useSupabase().value

  const templates = ref([])
  const currentTemplate = ref(null)

  const galleries = computed(() => templates.value.filter(item => item.public == true))

  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from('templates')
      .select()

    if (!error) {
      templates.value = data
    }
  }

  const fetchTemplate = async (id) => {
    const { data, error } = await supabase
      .from('templates')
      .select()
      .eq('id', id)

    if (!error) {
      currentTemplate.value = data[0]
    }
  }

  const updateTemplate = async (id, name) => {
    const { data, error } = await supabase
      .from('templates')
      .update({ name: name })
      .eq('id', id)
      .select()

    if (!error) {
      currentTemplate.value = data[0]
    }
  }

  const createTemplate = async (info) => {
    const { data, error } = await supabase
      .from('templates')
      .insert({ name: info.name, description: info.description })
      .select()

    if (!error) {
      currentTemplate.value = data[0]
    }

    return data[0]
  }

  return {
    templates,
    currentTemplate,
    galleries,
    fetchTemplates,
    fetchTemplate,
    createTemplate,
    updateTemplate
  }
})
