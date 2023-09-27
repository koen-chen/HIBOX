import { defineStore } from "pinia"
import { QuestionInsertType, QuestionUpdateType } from "~/types"

export const useQuestionStore = defineStore('question', () => {
  const supabase = useSupabase().value
  const formStore = useFormStore()
  const { questionList, sectionList } = storeToRefs(formStore)

  const latestQuestionId = ref<number | null>(null)

  const addQuestion = async (sectionId: number, info: QuestionInsertType, afterElement: { id: number, type: string }): Promise<void> => {
    const { data } = await supabase
      .from('question')
      .insert(info)
      .select()
      .maybeSingle()

    const section = sectionList.value.find(item => item.id == sectionId)

    if (data && section) {
      questionList.value.push(data)

      if (afterElement.type == 'Section') {
        section.question_order.push(data.id)
      } else {
        const index = section.question_order.findIndex(id => id == afterElement.id) + 1
        section.question_order.splice(index, 0, data.id)
      }

      latestQuestionId.value = data.id
      await updateOrder(sectionId, section.question_order)
    }
  }

  const updateQuestion = async (id: number, sectionId: number, info: QuestionUpdateType): Promise<void> => {
    const { data } = await supabase
      .from('question')
      .update(info)
      .eq('id', id)
      .select()
      .maybeSingle()

    if (data) {
      const index = questionList.value.findIndex(item => item.id == data.id)
      questionList.value.splice(index, 1, data)
    }
  }

  const deleteQuestion = async (id: number, sectionId: number): Promise<void> => {
    const section = sectionList.value.find(item => item.id == sectionId)

    if (section) {
      const index = questionList.value.findIndex(item => item.id == id)
      questionList.value.splice(index, 1)
      section.question_order = section.question_order.filter(item => item !== id)

      await updateOrder(sectionId, section.question_order)
    }
  }

  const updateOrder = async (sectionId: number, info: number[]): Promise<void> => {
    const { error } = await supabase
      .from('section')
      .update({ 'question_order': info })
      .eq('id', sectionId)
      .select()
  }

  return {
    latestQuestionId,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    updateOrder
  }
})