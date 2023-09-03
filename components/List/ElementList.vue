<template>
  <div>
    <div v-for="item in orderElements" :key="item.id">
      {{  item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Section } from '~/types'

interface Props {
  formId: number,
  section: Section,
}

const props = defineProps<Props>()
const elementStore = useElementStore()
const { elements } = storeToRefs(elementStore)

const orderElements = computed(() => {
  if (elements.value !== null && props.section !== null) {
    const ownElements = elements.value.filter(item => item.section_id == props.section.id)
    return useOrder(props.section.element_order, ownElements)
  } else {
    return []
  }
})

console.log('orderElements', elements)
</script>

<style lang="scss">

</style>