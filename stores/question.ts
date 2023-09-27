import { defineStore, acceptHMRUpdate } from "pinia"
import { QuestionInsertType, QuestionUpdateType } from "~/types"

export const useQuestionStore = defineStore('question', () => {
  const supabase = useSupabase().value
  const formStore = useFormStore()
  const sectionStore = useSectionStore()
  const { questionList, sectionList } = storeToRefs(formStore)

  const latestQuestionId = ref<number | null>(null)

  const addQuestion = async (info: QuestionInsertType, afterElement: { type: string, id: number, sectionId?: number }): Promise<void> => {
    const { data } = await supabase
      .from('question')
      .insert(info)
      .select()
      .maybeSingle()

    if (!data) return

    questionList.value = [...questionList.value, reactive(data)]
    latestQuestionId.value = data.id

    if (afterElement.type == 'Form') {
      await sectionStore.addSection({
        form_id: info.form_id,
        name: 'Untitled Section'
      }, {
        type: 'Form',
        id: info.form_id
      })

      if (sectionStore.latestSectionId) {
        const section = sectionList.value.find(item => item.id == sectionStore.latestSectionId)
        if (!section) return

        section.question_order = [...section.question_order, data.id]
        await updateQuestionOrder(section.id, section.question_order)
      }
    } else {
      const section = sectionList.value.find(item => item.id == afterElement.sectionId)
      if (!section) return

      if (afterElement.type == 'Section') {
        section.question_order.push(data.id)
      } else if (afterElement.type == 'Question') {
        const index = section.question_order.findIndex(id => id == afterElement.id) + 1
        section.question_order.splice(index, 0, data.id)
      }

       await updateQuestionOrder(section.id, section.question_order)
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

      await updateQuestionOrder(sectionId, section.question_order)
    }
  }

  const updateQuestionOrder = async (sectionId: number, info: number[]): Promise<void> => {
    await supabase
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
    updateQuestionOrder
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuestionStore, import.meta.hot))
}