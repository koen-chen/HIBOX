import { defineStore } from 'pinia'
import { useSectionsStore } from './sections'
import { Template, Section } from './types'

export const useTemplatesStore = defineStore('templates', () => {
  const supabase = useSupabase().value
  const sectionsStore = useSectionsStore()

  const templates = ref<Template[]>([])
  const currentTemplate = ref<Template>()

  const orderSections = ref<Section[]>([])

  const galleries = computed(() => templates.value.filter(item => item.public == true))

  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from('templates')
      .select()

    if (!error) {
      templates.value = data
    }
  }

  const getTemplate = async (id: number) => {
    const { data, error } = await supabase
      .from('templates')
      .select(`
        id,
        name,
        description,
        public,
        sections_order,
        sections (
          id,
          name,
          description,
          template_id,
          elements_order,
          elements (*)
        )
      `)
      .eq('id', id)

    if (!error) {
      currentTemplate.value = data[0]

      const { sections, sections_order: order } = data[0]

      order.forEach((id: number) => {
        const item = sections.find(item => item.id == id)
        if (item) {
          orderSections.value.push(item)
        }
      })

      return currentTemplate
    }
  }

  const updateTemplate = async (id: number, info: Template) => {
    const { data, error } = await supabase
      .from('templates')
      .update(info)
      .eq('id', id)
      .select()

    if (!error) {
      currentTemplate.value = data[0]
    }
  }

  const createTemplate = async (info: Template) => {
    const { data, error } = await supabase
      .from('templates')
      .insert({ name: info.name, description: info.description })
      .select()

    if (!error) {
      currentTemplate.value = data[0]
    }
  }

  return {
    templates,
    currentTemplate,
    galleries,
    orderSections,
    fetchTemplates,
    getTemplate,
    createTemplate,
    updateTemplate
  }
})
