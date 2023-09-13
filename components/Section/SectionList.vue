<template>
  <div class="section-list" ref="sortableSectionRef">
    <div v-for="(record, index) in sectionList" :key="record.id">
      <SectionRecord
        :formId="currentForm.id"
        :sectionData="record"
        :focused="choosedSectionId == record.id"
        @click="choosedSectionId = record.id"
      >
        <template #drag>
          <div class="flex items-center">
            <div class="drag-section">
              <Icon name="mdi:drag-horizontal" />
            </div>
            <div class="section-order">Section {{ record.id }} {{ index + 1 }} of {{ sectionList.length }}</div>
          </div>
        </template>
      </SectionRecord>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDraggable } from 'vue-draggable-plus'

const formStore = useFormStore()
const { currentForm } = storeToRefs(formStore)

const sectionStore = useSectionStore()
const { sectionList } = storeToRefs(sectionStore)

const sortableSectionRef = ref<HTMLElement | null>(null)
const choosedSectionId = ref<number | null>(null)

onClickOutside(sortableSectionRef, () => choosedSectionId.value = null)

useDraggable(sortableSectionRef, sectionList, {
  animation: 150,
  onSort() {
    choosedSectionId.value = null
    const orders = sectionList.value.map(item => item.id)
    sectionStore.updateOrder(currentForm.value.id, orders)
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

.chosen {
  height: 60px;

  .section-body {
    visibility: hidden;
  }
}

</style>