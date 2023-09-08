import { defineStore } from 'pinia'
import { FormType, FormInsertType, FormUpdateType } from '~/types'
import { useSectionStore } from './section'

export const useFormStore = defineStore('form', () => {
  const supabase = useSupabase().value
  const sectionStore = useSectionStore()

  const formList = ref<FormType[]>([])
  const currentForm = ref<FormType | null>(null)
  const publicFormList = computed(() => formList.value.filter(item => item.public == true))

  const listForm = async (): Promise<FormType[]> => {
    const { data, error } = await supabase
      .from('form')
      .select()
      .neq('state', 'Delete')
      .order('id', { ascending: false })

    if (!error) {
      formList.value = data
    }

    return formList.value
  }

  const getForm = async (id: number): Promise<FormType | null> => {
    const { data: formData, error } = await supabase
      .from('form')
      .select()
      .eq('id', id)
      .single()

    if (!error) {
      currentForm.value = formData
    }

    return currentForm.value
  }

  const addForm = async (info: FormInsertType): Promise<FormType | null> => {
    const { data, error } = await supabase
      .from('form')
      .insert({ name: info.name, description: info.description })
      .select()
      .single()

    if (!error) {
      currentForm.value = data

      if (formList.value) {
        formList.value.unshift(data)
      }

      sectionStore.$reset()
    }

    return currentForm.value
  }

  const updateForm = async (id: number, info: FormUpdateType): Promise<FormType | null> => {
    const { data, error } = await supabase
      .from('form')
      .update(info)
      .eq('id', id)
      .select()
      .single()

    if (!error) {
      currentForm.value = data

      if (formList.value) {
        formList.value = formList.value.map(item => {
          if (item.id == data.id) {
            return data
          } else {
            return item
          }
        })
      }
    }

    return currentForm.value
  }

  const deleteForm = async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('form')
      .update({ state: 'Delete' })
      .eq('id', id)
      .select()
      .single()

    if (!error) {
      currentForm.value = null

      await sectionStore.deleteSectionBy({ form_id: id })

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
