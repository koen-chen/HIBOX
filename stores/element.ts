import { defineStore } from "pinia"
import { Element, ElementUpdate } from "@/types"

export const useElementStore = defineStore('element', () => {
  const supabase = useSupabase().value

  const elements = ref<Element[] | null>(null)
  const currentElement = ref<Element | null>(null)

  const fetchElements = async (form_id: number): Promise<Element[] | []> => {
    const { data, error } = await supabase
      .from('element')
      .select()
      .eq('form_id', form_id)
      .neq('state', 'Delete')

    if (!error) {
      elements.value = data
      return elements.value
    }

    return []
  }

  const addElement = async (info: ElementUpdate): Promise<Element | null> => {
    const { data, error } = await supabase
      .from('element')
      .insert(info)
      .select()

    if (!error) {
      currentElement.value = data[0]
      if (elements.value !== null) {
        elements.value.push(data[0])
      }
      return currentElement.value
    }

    return null
  }

  const updateElement = async (id: number, info: ElementUpdate): Promise<Element | null> => {
    const { data, error } = await supabase
      .from('element')
      .update(info)
      .eq('id', id)
      .select()

    if (!error) {
      currentElement.value = data[0]
      return currentElement.value
    }

    return null
  }

  const deleteElement = async (id: number): Promise<void> => {
    const { data, error } = await supabase
      .from('element')
      .update({ state: 'Delete' })
      .eq('id', id)
  }

  return {
    elements,
    currentElement,
    fetchElements,
    addElement,
    updateElement,
    deleteElement
  }
})