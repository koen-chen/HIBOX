import { defineStore } from 'pinia'
import { Template, TemplateUpdate } from '@/types'

export const useTemplateStore = defineStore('template', () => {
  const supabase = useSupabase().value

  const templates = ref<Template[]>([])
  const currentTemplate = ref<Template | null>(null)
  const publicTemplates = computed(() => templates.value.filter(item => item?.public == true))

  const fetchTemplates = async (): Promise<Template[] | []> => {
    const { data, error } = await supabase
      .from('template')
      .select()

    if (!error) {
      templates.value = data
      return templates.value
    }

    return []
  }

  const getTemplate = async (id: number): Promise<Template | null> => {
    const { data: templateData, error } = await supabase
      .from('template')
      .select()
      .eq('id', id)

    if (!error) {
      currentTemplate.value = templateData[0]
      return currentTemplate.value
    }
    return null
  }

  const createTemplate = async (info: TemplateUpdate): Promise<Template | null> => {
    const { data, error } = await supabase
      .from('template')
      .insert({ name: info.name, description: info.description })
      .select()

    if (!error) {
      currentTemplate.value = data[0]
      return currentTemplate.value
    }

    return null
  }

  const updateTemplate = async (id: number, info: TemplateUpdate): Promise<Template | null> => {
    const { data, error } = await supabase
      .from('template')
      .update(info)
      .eq('id', id)
      .select()

    if (!error) {
      currentTemplate.value = data[0]
      return currentTemplate.value
    }

    return null
  }

  const deleteTemplate = async (id: number): Promise<void> => {
    const { data, error } = await supabase
      .from('template')
      .delete()
      .eq('id', id)

    if (!error) {
      currentTemplate.value = null
      templates.value = templates.value.filter(item => item.id !== id)
    }
  }

  return {
    templates,
    currentTemplate,
    publicTemplates,
    fetchTemplates,
    getTemplate,
    createTemplate,
    updateTemplate,
    deleteTemplate
  }
})
