import { defineStore } from "pinia"

export const useElementsStore = defineStore('elements', () => {
  const supabase = useSupabase().value

  const orderElements = ref([])
  const currentElement = ref(null)

  const fetchElements = async (sectionId) => {
    const { data, error } = await supabase
      .from('sections')
      .select(`
        elements_order,
        elements (
          *
        )
      `)
      .eq('id', sectionId)

    const { elements, elements_order: order } = data[0]

    const tempElements = order.map(id => {
      return elements.find(item => item.id == id)
    })

    if (!error) {
      orderElements.value = tempElements
    }
  }

  const addElement = async (info) => {
    const { data, error } = await supabase
      .from('elements')
      .insert(info)
      .select()

    if (!error) {
      currentElement.value = data[0]
      orderElements.value.push(currentElement.value)
    }
  }

  const updateElement = async (id, info) => {
    const { data, error } = await supabase
      .from('elements')
      .update(info)
      .eq('id', id)
      .select()

    if (!error) {
      currentElement.value = data[0]
      currentElement.value.map(item, () => {
        if (item.id == currentElement.value.id) {
          return currentElement.value
        }
        return item
      })
    }
  }

  const updateOrder = async (sectionId, info) => {
    const { data, error } = await supabase
      .from('sections')
      .update({ 'elements_order': info })
      .eq('id', sectionId)
      .select()
  }

  return {
    orderElements,
    currentElement,
    fetchElements,
    addElement,
    updateElement,
    updateOrder
  }
})