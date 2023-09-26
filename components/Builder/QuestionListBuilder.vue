<template>
  <VueDraggable
    :animation="150"
    ghostClass="ghost-question"
    handle=".qDrag-handle"
    v-model="qList"
  >
    <div v-for="(qRecord, qIndex) in qList" :key="qRecord.id">
      <QuestionBuilder
        :record="qRecord"
        :order="qIndex + 1"
      >
      </QuestionBuilder>
    </div>
  </VueDraggable>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { QuestionType } from '~/types';

const props = defineProps<{
  list: QuestionType[],
  sectionId: number
}>()

const questionStore = useQuestionStore()

const qList = ref(props.list)

watch(qList, () => {
  const tempOrders = qList.value.map(item => item.id)
  questionStore.updateOrder(props.sectionId, tempOrders)
})
</script>

<style lang="scss">
.ghost-question {
  opacity: 0.5;
  background: $primaryHoverColor;
}
</style>