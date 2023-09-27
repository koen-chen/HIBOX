import { defineStore, acceptHMRUpdate } from 'pinia'
import { FormType, FormInsertType, FormUpdateType, SectionType, QuestionType } from '~/types'

export const useFormStore = defineStore('form', () => {
  const supabase = useSupabase().value

  const initFormValue = {
    id: 0,
    name: '',
    description: '',
    section_order: [],
    public: false,
    state: '',
    created_at: '',
  }

  const currentForm = ref<FormType>(initFormValue)

  const formList = ref<FormType[]>([])
  const sectionList = ref<SectionType[]>([])
  const questionList = ref<QuestionType[]>([])

  const sectionOrder = ref<number[]>([])

  const $reset = () => {
    currentForm.value = initFormValue
    formList.value = []
    sectionList.value = []
    questionList.value = []
  }

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

  const getForm = async (id: number): Promise<FormType> => {
    const { data } = await supabase
      .from('form')
      .select(`
        *,
        section (*),
        question (*)
      `)
      .eq('id', id)
      .maybeSingle()

    if (data) {
      currentForm.value = _Pick(data, 'id', 'name', 'description', 'public', 'section_order', 'state', 'created_at')
      sectionOrder.value = data.section_order
      sectionList.value = data.section
      questionList.value = data.question
    }

    return currentForm.value
  }

  const addForm = async (info: FormInsertType): Promise<FormType> => {
    const { data } = await supabase
      .from('form')
      .insert({ name: info.name, description: info.description })
      .select()
      .maybeSingle()

    if (data) {
      currentForm.value = data

      if (formList.value) {
        formList.value.unshift(data)
      }
    }

    return currentForm.value
  }

  const updateForm = async (id: number, info: FormUpdateType): Promise<FormType> => {
    const { data } = await supabase
      .from('form')
      .update(info)
      .eq('id', id)
      .select()
      .maybeSingle()

    if (data) {
      currentForm.value = data

      const index = formList.value.findIndex(item => item.id == data.id)
      formList.value.splice(index, 1, data)
    }

    return currentForm.value
  }

  const deleteForm = async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('form')
      .update({ state: 'Delete' })
      .eq('id', id)
      .select()
      .maybeSingle()

    if (!error) {
      currentForm.value = initFormValue
      formList.value = formList.value.filter(item => item.id !== id)
    }
  }

  return {
    $reset,
    formList,
    sectionList,
    questionList,
    sectionOrder,
    currentForm,
    listForm,
    getForm,
    addForm,
    updateForm,
    deleteForm
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFormStore, import.meta.hot))
}