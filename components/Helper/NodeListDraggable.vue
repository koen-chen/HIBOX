<template>
   <VueDraggable
    :scroll="true"
    direction="vertical"
    :animation="100"
    ghostClass="ghost-question"
    dragClass="ghost-question"
    :handle="props.handle"
    :group="props.group"
    :forceAutoScrollFallback="true"
    :scrollSensitivity="30"
	  :scrollSpeed="10"
	  :bubbleScroll="true"
    v-model="nodeList"
    @sort="handleSort"
  >
    <slot :list="nodeList" :parentId="props.parentId" />
  </VueDraggable>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { QuestionType } from '~/types';

const props = defineProps<{
  parentId: string,
  order: string[],
  list: QuestionType[],
  group?: string,
  handle?: string,
  onSort?: Function
}>()

const nodeList = ref(useOrder(props.order, props.list))

watchEffect(() => {
  nodeList.value = useOrder(props.order, props.list)
})

function handleSort() {
  if (typeof props.onSort == 'function') {
    props.onSort(nodeList.value, props.parentId)
  }
}
</script>

<style lang="scss">
.ghost-question {
  opacity: 0.5;
  background: $primaryHoverColor;

  .ghost-body {
    display: none;
  }
}
</style>