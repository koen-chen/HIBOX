<template>
  <div class="section-list" ref="sortableBoxRef">
    <div v-for="(record, index) in orderSectionList" :key="record.id">
      <SectionRecord
        :formId="currentForm.id"
        :sectionData="record"
        :focused="choosedSectionId == record.id"
        @click="choosedSectionId = record.id"
      >
        <template #drag>
          <div class="flex items-center">
            <div class="drag-handler">
              <Icon name="mdi:drag-horizontal" />
            </div>
            <div class="section-order">Section {{ index + 1 }} of {{ orderSectionList.length }}</div>
          </div>
        </template>
      </SectionRecord>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSortable, moveArrayElement } from '@vueuse/integrations/useSortable'

const formStore = useFormStore()
const { currentForm } = storeToRefs(formStore)

const sectionStore = useSectionStore()
const { sectionList, sectionOrder } = storeToRefs(sectionStore)


const sortableBoxRef = ref<HTMLElement | null>(null)
const choosedSectionId = ref<number | null>(null)

const orderSectionList = computed(() => useOrder(sectionOrder.value, sectionList.value))

onClickOutside(sortableBoxRef, () => choosedSectionId.value = null)

useSortable(sortableBoxRef, orderSectionList.value, {
  animation: 150,
  handle: '.drag-handler',
  onUpdate: (e: any) => {
    moveArrayElement(orderSectionList.value, e.oldIndex, e.newIndex)

    nextTick(() => {
      const element = orderSectionList.value[e.newIndex]
      choosedSectionId.value = element.id

      const orders = orderSectionList.value.map(item => item.id)
      sectionStore.updateOrder(currentForm.value.id, orders)
    })
  }
})
</script>

<style lang="scss">
.section-list {
  min-height: 100px;
}

.section-order {
  color: $textColor;
  @apply ml-2;
}

.drag-handler {
  @apply cursor-move p-2;
}
</style>