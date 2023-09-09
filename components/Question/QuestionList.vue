<template>
  <div class="w-full" ref="sortableBoxRef" >
    <div v-for="(item, index) in orderQuestionList" :key="item.id" class="section-fragement">
      <QuestionRecord>
        <template #drag>
          <div class="flex items-center justify-center mb-5">
            <div class="drag-handler">
              <Icon name="mdi:drag-horizontal" />
            </div>

            <div class="section-order">Question {{ index + 1 }}</div>
          </div>
        </template>
      </QuestionRecord>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SectionType, QuestionType } from '~/types'
import { useSortable, moveArrayElement } from '@vueuse/integrations/useSortable'

const props = defineProps<{
  sectionData: SectionType,
  questionList: QuestionType[]
}>()

const questionStore = useQuestionStore()
const { questionOrder } = storeToRefs(questionStore)

const sortableBoxRef = ref<HTMLElement | null>(null)

const orderQuestionList = computed(() => {
  if (props.sectionData !== null) {
    return useOrder(questionOrder.value[props.sectionData.id], props.questionList)
  } else {
    return []
  }
})

useSortable(sortableBoxRef, orderQuestionList.value, {
  animation: 150,
  handle: '.drag-handler',
  onUpdate: (e: any) => {
    moveArrayElement(orderQuestionList.value, e.oldIndex, e.newIndex)

    nextTick(() => {
      const orders = orderQuestionList.value.map(item => item.id)
      questionStore.updateOrder(props.sectionData.id, orders)
    })
  }
})
</script>

<style lang="scss" scoped>
.section-fragement {
  background-color: $maskColor;
  border: 1px solid $primaryHoverColor;

  @apply w-full p-4 mb-4;
}
</style>