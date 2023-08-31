import { defineStore } from "pinia"
import { Element } from "./types"

export const useElementsStore = defineStore('elements', () => {
  const supabase = useSupabase().value

  const orderElements = ref<Element[]>([])
  const currentElement = ref<Element | null>(null)

  const fetchElements = async (sectionId: number) => {
    const { data, error } = await supabase
      .from('sections')
      .select(`
        elements_order,
        elements (
          *
        )
      `)
      .eq('id', sectionId)

    if (!error) {
      const { elements, elements_order: order } = data[0]

      const tempElements = order.map((id: number) => {
        return elements.find(item => item.id == id)
      })

      orderElements.value = tempElements
    }
  }

  const addElement = async (info: Element) => {
    const { data, error } = await supabase
      .from('elements')
      .insert(info)
      .select()

    if (!error) {
      currentElement.value = data[0]
      //orderElements.value.push(currentElement.value)
    }
  }

  const updateElement = async (id: number, info: Element) => {
    const { data, error } = await supabase
      .from('elements')
      .update(info)
      .eq('id', id)
      .select()

    if (!error) {
      currentElement.value = data[0]
      // currentElement.value.map(item, () => {
      //   if (item.id == currentElement.value.id) {
      //     return currentElement.value
      //   }
      //   return item
      // })
    }
  }

  const updateOrder = async (sectionId: number, info: Element) => {
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