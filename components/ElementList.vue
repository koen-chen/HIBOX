<template>
  <div class="element-list">
      <div ref="el">
        <div v-for="item in orderElements" :key="item.id" class="element-box">
          <div class="drag-handler">
            <Icon name="mdi:drag-horizontal" />
          </div>
          <div class="element-content">
            <el-input v-model="item.name" class="border-input" />
            <el-input v-model="item.description" placeholder="Description (optional)" class="border-input" type="textarea" autosize />
          </div>
        </div>
      </div>

      <div class="mt-9">
        <el-button size="large" circle @click="addElement">
          <Icon name="mdi:plus-circle" />
        </el-button>
      </div>
    </div>
</template>

<script setup>
import { useSortable, moveArrayElement } from '@vueuse/integrations/useSortable'

const props = defineProps({
  sectionId: Number
})

const elementsStore = useElementsStore()
const { orderElements } = storeToRefs(elementsStore)

watch(() => props.sectionId, () => {
  if (props.sectionId) {
    elementsStore.fetchElements(props.sectionId)
  }
}, { immediate: true })

const el = ref(null)

useSortable(el, orderElements, {
  animation: 150,
  handle: '.drag-handler',
  onUpdate: (e) => {
    moveArrayElement(orderElements.value, e.oldIndex, e.newIndex)

    nextTick(() => {
      elementsStore.updateOrder(props.sectionId, orderElements.value.map(item => item.id))
    })
  }
})

const addElement = () => {
  elementsStore.addElement({
    name: 'Untitled Section',
    section_id: props.sectionId
  })
}
</script>