import { defineStore } from "pinia"
import { QuestionType, QuestionInsertType, QuestionUpdateType } from "~/types"

export const useQuestionStore = defineStore('question', () => {
  const supabase = useSupabase().value

  const questionList = ref<{ [key: number]: QuestionType[]}>({})
  const questionOrder = ref<{ [key: number]: number[] }>({})
  const latestQuestionId = ref<number | null>(null)

  const $reset = () => {
    questionList.value = {}
    questionOrder.value = {}
  }

  const addQuestion = async (info: QuestionInsertType, afterElement: { id: number, type: string }): Promise<void> => {
    const { data } = await supabase
      .from('question')
      .insert(info)
      .select()
      .maybeSingle()

    if (data) {
      if (afterElement.type == 'Section') {
        questionList.value[info.section_id].push(data)
        questionOrder.value[info.section_id].push(data.id)
      } else {
        const index = questionOrder.value[info.section_id].findIndex(id => id == afterElement.id) + 1
        questionList.value[info.section_id].splice(index, 0, data)
        questionOrder.value[info.section_id].splice(index, 0, data.id)
      }

      latestQuestionId.value = data.id
      await updateOrder(info.section_id, questionOrder.value[info.section_id])
    }
  }

  const updateQuestion = async (id: number, info: QuestionUpdateType): Promise<void> => {
    const { data } = await supabase
      .from('question')
      .update(info)
      .eq('id', id)
      .select()
      .maybeSingle()

    if (data) {
      const index = questionList.value[data.section_id].findIndex(item => item.id == data.id)
      questionList.value[data.section_id].splice(index, 1, data)
    }
  }

  const deleteQuestion = async (id: number): Promise<void> => {
    const { data } = await supabase
      .from('question')
      .update({ state: 'Delete' })
      .eq('id', id)
      .select()
      .maybeSingle()

    if (data) {
      const order = questionOrder.value[data.section_id].filter(item => item == id)
      await updateOrder(data.section_id, order)

      questionList.value[data.section_id] = questionList.value[data.section_id].filter(item => item.id !== id)
    }
  }

  const deleteQuestionBy = async (filters: { [key: string]: string | number }): Promise<void> => {
    let query = supabase.from('question').update({ state: 'Delete' })

    for (const key in filters) {
      query.eq(key, filters[key])
    }

    const { data, error } = await query.select()

    if (!error && data.length > 0) {
      let order = questionOrder.value[data[0].section_id]

      data.forEach((record) => {
        order = order.filter(item => item == record.id)
      })

      await updateOrder(data[0].section_id, order)
    }
  }

  const updateOrder = async (sectionId: number, info: number[]): Promise<void> => {
    const { error } = await supabase
      .from('section')
      .update({ 'question_order': info })
      .eq('id', sectionId)
      .select()

    if (!error) {
      questionOrder.value[sectionId] = info
    }
  }

  return {
    $reset,
    latestQuestionId,
    questionOrder,
    questionList,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    deleteQuestionBy,
    updateOrder
  }
})