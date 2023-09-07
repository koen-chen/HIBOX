<template>
  <div class="w-full">
    <div v-for="item in orderQuestionList" :key="item.id" class="section-fragement">
      <Question />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SectionType, QuestionType } from '~/types'

interface Props {
  formId: number,
  sectionItem: SectionType,
  questionList: QuestionType[] | []
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

<style lang="scss" scoped>
.section-fragement {
  background-color: $maskColor;
  border-bottom: 1px solid $primaryHoverColor;
  border-top: 1px solid $primaryHoverColor;

  @apply w-full p-4 mb-4;
}
</style>