<template>
  <div>
    <div v-for="item in orderQuestionList" :key="item.id">
      question id: {{  item.id }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Section, Question } from '~/types'

interface Props {
  formId: number,
  sectionItem: Section,
  questionList: Question[] | []
}

const props = defineProps<Props>()
const questionStore = useQuestionStore()

const orderQuestionList = computed(() => {
  if (props.sectionItem !== null) {
    return useOrder(props.sectionItem.question_order, props.questionList)
  } else {
    return []
  }
})
</script>

<style lang="scss">

</style>