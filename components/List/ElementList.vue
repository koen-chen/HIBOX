<template>
  <div>
    <div v-for="item in orderElements" :key="item.id">
      element id: {{  item.id }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Section, Element } from '~/types'

interface Props {
  formId: number,
  sectionItem: Section,
  elements: Element[] | []
}

const props = defineProps<Props>()
const elementStore = useElementStore()

const orderElements = computed(() => {
  if (props.sectionItem !== null) {
    return useOrder(props.sectionItem.element_order, props.elements)
  } else {
    return []
  }
})
</script>

<style lang="scss">

</style>