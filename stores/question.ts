import { defineStore } from "pinia"
import { Question, QuestionUpdate } from "@/types"

export const useQuestionStore = defineStore('question', () => {
  const supabase = useSupabase().value

  const questionList = ref<Question[] | null>(null)
  const currentQuestion = ref<Question | null>(null)

  const listQuestion = async (form_id: number): Promise<Question[] | []> => {
    const { data, error } = await supabase
      .from('question')
      .select()
      .eq('form_id', form_id)
      .neq('state', 'Delete')

    if (!error) {
      questionList.value = data
      return questionList.value
    }

    return []
  }

  const addQuestion = async (info: QuestionUpdate): Promise<Question | null> => {
    const { data, error } = await supabase
      .from('question')
      .insert(info)
      .select()

    if (!error) {
      currentQuestion.value = data[0]
      if (questionList.value !== null) {
        questionList.value.push(data[0])
      }
      return currentQuestion.value
    }

    return null
  }

  const updateQuestion = async (id: number, info: QuestionUpdate): Promise<Question | null> => {
    const { data, error } = await supabase
      .from('question')
      .update(info)
      .eq('id', id)
      .select()

    if (!error) {
      currentQuestion.value = data[0]
      return currentQuestion.value
    }

    return null
  }

  const deleteQuestion = async (id: number): Promise<void> => {
    const { data, error } = await supabase
      .from('question')
      .update({ state: 'Delete' })
      .eq('id', id)
  }

  return {
    questionList,
    currentQuestion,
    listQuestion,
    addQuestion,
    updateQuestion,
    deleteQuestion
  }
})