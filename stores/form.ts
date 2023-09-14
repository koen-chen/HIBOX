import { defineStore } from 'pinia'
import { FormType, FormInsertType, FormUpdateType, SectionType, QuestionType } from '~/types'
import { useSectionStore } from './section'

export const useFormStore = defineStore('form', () => {
  const supabase = useSupabase().value
  const sectionStore = useSectionStore()
  const questionStore = useQuestionStore()

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

  const fetchLoading = ref(false)
  const updateLoading = ref(false)

  const publicFormList = computed(() => formList.value.filter(item => item.public == true))

  const $reset = () => {
    currentForm.value = initFormValue
    formList.value = []

    sectionStore.$reset()
  }

  const _listForm = async (): Promise<FormType[]> => {
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

  const _getForm = async (id: number): Promise<FormType> => {
    const { data, error } = await supabase
      .from('form')
      .select(`
        *,
        section (*),
        question (*)
      `)
      .eq('id', id)
      .single()

    if (!error) {
      currentForm.value = _Pick(data, 'id', 'name', 'description', 'public', 'section_order', 'state', 'created_at')

      sectionStore.sectionOrder = data.section_order
      sectionStore.sectionList = useOrder(data.section_order, data.section)

      data.section.forEach((item: SectionType) => {
        questionStore.questionOrder[item.id] = item.question_order
        questionStore.questionList[item.id] = useOrder(item.question_order, data.question.filter((q: QuestionType) => q.section_id == item.id))
      })
    }

    return currentForm.value
  }

  const _addForm = async (info: FormInsertType): Promise<FormType> => {
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

  const _updateForm = async (id: number, info: FormUpdateType): Promise<FormType> => {
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

  const _deleteForm = async (id: number): Promise<void> => {
    const { error } = await supabase
      .from('form')
      .update({ state: 'Delete' })
      .eq('id', id)
      .select()
      .single()

    if (!error) {
      currentForm.value = initFormValue

      await sectionStore.deleteSectionBy({ form_id: id })

      formList.value = formList.value && formList.value.filter(item => item.id !== id)
    }
  }

  const listForm = loadingDecorator(_listForm, fetchLoading)
  const getForm = loadingDecorator(_getForm, fetchLoading)
  const addForm = loadingDecorator(_addForm, updateLoading)
  const updateForm = loadingDecorator(_updateForm, updateLoading)
  const deleteForm = loadingDecorator(_deleteForm, updateLoading)

  return {
    $reset,
    fetchLoading,
    updateLoading,
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
