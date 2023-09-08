<template>
  <div class="section-list" ref="sortableBoxRef" v-loading="listLoading">
    <div v-for="(item, index) in orderSectionList" :key="item.id">
      <Section
        :sectionData="item"
        :formId="form.id"
        :focused="choosedSectionId == item.id"
        @click="choosedSectionId = item.id"
      >
        <template #drag>
          <div class="flex items-center">
            <div class="drag-handler">
              <Icon name="mdi:drag-horizontal" />
            </div>
            <div class="section-order">Section {{ index + 1 }} of {{ orderSectionList.length }}</div>
          </div>
        </template>
      </Section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormType } from '~/types'
import { useSortable, moveArrayElement } from '@vueuse/integrations/useSortable'

const props = defineProps<{ form: FormType }>()
const sectionStore = useSectionStore()
const { sectionList } = storeToRefs(sectionStore)
const questionStore = useQuestionStore()

const sortableBoxRef = ref<HTMLElement | null>(null)
const choosedSectionId = ref<number | null>(null)

const listLoading = ref(false)

const orderSectionList = computed(() => {
  if (sectionList.value !== null && props.form !== null) {
    return useOrder(props.form.section_order, sectionList.value)
  } else {
    return []
  }
})

useWatchNull(sectionList, listLoading, async () => {
  await sectionStore.listSection(props.form.id)
  await questionStore.listQuestion(props.form.id)
})

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
      sectionStore.updateOrder(props.form.id, orders)
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