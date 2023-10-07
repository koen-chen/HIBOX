<template>
  <div>
     <slot :list="nodeList" />
  </div>
</template>

<script setup lang="ts">
import { QuestionType } from '~/types';

const props = defineProps<{
  order: string[],
  list: QuestionType[]
}>()

const nodeList = ref(useOrder(props.order, props.list).map(item => {
  if (item.type == 'Checkbox') {
    item.value = []
  } else {
    item.value = ''
  }
  return item
}))

watchEffect(() => {
  nodeList.value = useOrder(props.order, props.list)
})
</script>