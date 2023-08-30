import { defineStore } from 'pinia'

export const useTemplatesStore = defineStore('templates', () => {
  const supabase = useSupabase().value

  const templates = ref([])
  const currentTemplate = ref({
    id: null,
    name: null,
    description: null,
    sections_order: [],
    sections: []
  })

  const orderSections = ref([])

  const galleries = computed(() => templates.value.filter(item => item.public == true))

  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from('templates')
      .select()

    if (!error) {
      templates.value = data
    }
  }

  const getTemplate = async (id) => {
    const { data, error } = await supabase
      .from('templates')
      .select(`
        id,
        name,
        description,
        sections_order,
        sections (
          id,
          name,
          description,
          elements_order,
          elements (*)
        )
      `)
      .eq('id', id)

    if (!error) {
      currentTemplate.value = data[0]

      const { sections, sections_order: order } = data[0]

      order.forEach(id => {
        orderSections.value.push(sections.find(item => item.id == id))
      })

      return currentTemplate
    }
  }

  const updateTemplate = async (id, info) => {
    const { data, error } = await supabase
      .from('templates')
      .update(info)
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
