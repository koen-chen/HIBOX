import { defineStore, acceptHMRUpdate } from 'pinia'
import { FormType, FormInsertType, FormUpdateType, SectionType, QuestionType } from '~/types'

export const useFormStore = defineStore('form', () => {
  const baas = useBaas().value

  const initFormValue = {
    id: '',
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

  const sectionOrder = ref<string[]>([])

  const $reset = () => {
    currentForm.value = initFormValue
    formList.value = []
    sectionList.value = []
    questionList.value = []
  }

  const listForm = async (): Promise<FormType[]> => {
    const { data, error } = await baas.listRecord('form', {
      'neg': ['state', 'Delete']
    })

    if (!error) {
      formList.value = data
    }

    return formList.value
  }

  const getForm = async (id: string): Promise<FormType> => {
    const { data } = await baas.getRecord('form', id)
    const { data: sectionResult } = await baas.listRecord('section', {
      'eg': ['form_id', id]
    })

    const { data: questionResult } = await baas.listRecord('question', {
      'eg': ['form_id', id]
    })

    if (data) {
      currentForm.value = _Pick(data, 'id', 'name', 'description', 'public', 'section_order', 'state', 'created_at')
      sectionOrder.value = data.section_order
      sectionList.value = sectionResult
      questionList.value = questionResult
    }

    return currentForm.value
  }

  const addForm = async (info: FormInsertType): Promise<FormType> => {
    const { data } = await baas.addRecord('form', info)

    if (data) {
      currentForm.value = data

      if (formList.value) {
        formList.value.unshift(data)
      }
    }

    return currentForm.value
  }

  const updateForm = async (id: string, info: FormUpdateType): Promise<FormType> => {
    const { data } = await baas.updateRecord('form', id, info)

    if (data) {
      currentForm.value = data

      const index = formList.value.findIndex(item => item.id == data.id)
      formList.value.splice(index, 1, data)
    }

    return currentForm.value
  }

  const deleteForm = async (id: string): Promise<void> => {
    const { error } = await baas.deleteRecord('form', id)

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