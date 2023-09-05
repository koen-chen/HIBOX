import { defineStore } from 'pinia'
import { Form, FormUpdate } from '@/types'
import { useSectionStore } from './section'

export const useFormStore = defineStore('form', () => {
  const supabase = useSupabase().value
  const sectionStore = useSectionStore()

  const formList = ref<Form[] | null>(null)
  const currentForm = ref<Form | null>(null)
  const publicFormList = computed(() => formList.value?.filter(item => item?.public == true))

  const listForm = async (): Promise<Form[] | []> => {
    const { data, error } = await supabase
      .from('form')
      .select()
      .neq('state', 'Delete')
      .order('id', { ascending: false })

    if (!error) {
      formList.value = data
      return formList.value
    }

    return []
  }

  const getForm = async (id: number): Promise<Form | null> => {
    const { data: formData, error } = await supabase
      .from('form')
      .select()
      .eq('id', id)

    if (!error) {
      currentForm.value = formData[0]
      return currentForm.value
    }
    return null
  }

  const addForm = async (info: FormUpdate): Promise<Form | null> => {
    const { data, error } = await supabase
      .from('form')
      .insert({ name: info.name, description: info.description })
      .select()

    if (!error) {
      currentForm.value = data[0]
      if (formList.value !== null) {
        formList.value.unshift(data[0])
      }
      sectionStore.$reset()
      return currentForm.value
    }

    return null
  }

  const updateForm = async (id: number, info: FormUpdate): Promise<Form | null> => {
    const { data, error } = await supabase
      .from('form')
      .update(info)
      .eq('id', id)
      .select()

    if (!error) {
      currentForm.value = data[0]
      return currentForm.value
    }

    return null
  }

  const deleteForm = async (id: number): Promise<void> => {
    const { data, error } = await supabase
      .from('form')
      .update({ state: 'Delete' })
      .eq('id', id)

    if (!error) {
      currentForm.value = null
      formList.value = formList.value && formList.value.filter(item => item.id !== id)
    }
  }

  return {
    formList,
    publicFormList,
    currentForm,
    listForm,
    getForm,
    addForm,
    updateForm,
    deleteForm
  }
})
