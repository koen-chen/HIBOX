import { defineStore } from "pinia"
import { QuestionType, QuestionInsertType, QuestionUpdateType, SectionUpdateType } from "~/types"

export const useQuestionStore = defineStore('question', () => {
  const supabase = useSupabase().value

  const questionList = ref<QuestionType[]>([])
  const currentQuestion = ref<QuestionType | null>(null)
  const questionOrder = ref<number[]>([])

  function $reset() {
    questionList.value = []
    questionOrder.value = []
  }

  const listQuestion = async (form_id: number): Promise<QuestionType[]> => {
    const { data, error } = await supabase
      .from('question')
      .select(`
        *,
        section (
          question_order
        )
      `)
      .eq('form_id', form_id)
      .neq('state', 'Delete')

    if (!error) {
      questionList.value = data

      if (data.length > 0) {
        questionOrder.value = data[0].section.question_order
      }
    }

    return questionList.value
  }

  const addQuestion = async (info: QuestionInsertType): Promise<QuestionType | null> => {
    const { data, error } = await supabase
      .from('question')
      .insert(info)
      .select()
      .single()

    if (!error) {
      currentQuestion.value = data

      const order = await getOrder(info.section_id)
      await updateOrder(info.section_id, [...order, data.id])
      questionList.value.push(data)

      return data
    }

    return null
  }

  const updateQuestion = async (id: number, info: QuestionUpdateType): Promise<QuestionType | null> => {
    const { data, error } = await supabase
      .from('question')
      .update(info)
      .eq('id', id)
      .select()
      .single()

    if (!error) {
      currentQuestion.value = data

      questionList.value = questionList.value.map(item => {
        if (item.id == data.id) {
          return data
        } else {
          return item
        }
      })
    }

    return currentQuestion.value
  }

  const deleteQuestion = async (id: number): Promise<void> => {
    const { data, error } = await supabase
      .from('question')
      .update({ state: 'Delete' })
      .eq('id', id)
      .select()
      .single()

    if (!error) {
      currentQuestion.value = null

      const order = await getOrder(data.section_id)
      questionOrder.value = order.filter(item => item == id)
      await updateOrder(data.section_id, questionOrder.value)

      questionList.value = questionList.value && questionList.value.filter(item => item.id !== id)
    }
  }

  const deleteQuestionBy = async (filters: { [key: string]: string | number }): Promise<void> => {
    let query = supabase.from('question').update({ state: 'Delete' })

    for (const key in filters) {
      query.eq(key, filters[key])
    }

    const { data, error } = await query.select()

    if (!error && data.length > 0) {
      const order = await getOrder(data[0].section_id)
      data.forEach((record) => {
        questionOrder.value = order.filter(item => item == record.id)
      })

      await updateOrder(data[0].section_id, questionOrder.value)
    }
  }

  const getOrder = async (sectionId: number): Promise<number[]> => {
    const { data, error } = await supabase
      .from('section')
      .select('question_order')
      .eq('id', sectionId)
      .limit(1)
      .single()

    if (!error) {
      questionOrder.value = data.question_order
    }

    return questionOrder.value
  }

  const updateOrder = async (sectionId: number, info: number[]): Promise<number[]> => {
    const { error } = await supabase
      .from('section')
      .update({ 'question_order': info })
      .eq('id', sectionId)
      .select()

    if (!error) {
      questionOrder.value = info
    }

    return questionOrder.value
  }

  return {
    $reset,
    questionOrder,
    questionList,
    currentQuestion,
    listQuestion,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    deleteQuestionBy,
    getOrder,
    updateOrder
  }
})