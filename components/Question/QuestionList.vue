<template>
  <div class="w-full" ref="sortableQuestionRef">
    <div v-for="(item, index) in list" :key="item.id" :data-id="item.id" class="section-fragement">
      <QuestionRecord :collapse="collapse">
        <template #drag>
          <div class="flex items-center justify-center mb-5">
            <div class="drag-question">
              <Icon name="mdi:drag-horizontal" />
            </div>

            <div class="section-order">Question {{ item.id }} {{ index + 1 }}</div>
          </div>
        </template>
      </QuestionRecord>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SectionType } from '~/types'
import { useDraggable } from 'vue-draggable-plus'

const props = defineProps<{
  sectionData: SectionType,
}>()

const questionStore = useQuestionStore()
const { questionList } = storeToRefs(questionStore)
const list = ref(questionList.value[props.sectionData.id])
const sortableQuestionRef = ref()
const collapse = ref(false)

useDraggable(sortableQuestionRef, list, {
  animation: 150,
  group: 'question',
  onSort() {
    const orders = list.value.map(item => item.id)
    questionStore.updateOrder(props.sectionData.id, orders)
  }
})
</script>

<style lang="scss">
.section-fragement {
  background-color: $maskColor;
  border: 1px solid $primaryHoverColor;

  @apply w-full p-4 mb-4;
}

</style>