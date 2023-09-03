<template>
  <div>
    <div class="section-list" ref="sortableBoxRef" v-loading="listLoading">
      <TransitionGroup name="list">
        <div v-for="(item, index) in orderSections"
          :key="item.id"
          class="section-box relative overflow-hidden"
          :class="{ 'focus': choosedSectionId === item.id }"
          @click="choosedSectionId = item.id"
        >
          <div class="section-head relative z-30">
            <div class="flex-grow flex items-center">
              <div class="drag-handler">
                <Icon name="mdi:drag-horizontal" />
              </div>
              <div class="section-order">Section {{ index + 1 }} of {{ orderSections.length }}</div>
            </div>

            <div>
              <el-tooltip :content="$t('Collapse Section')" placement="top" effect="light">
                <span @click="() => hanldeSectionCollapse(item.id)">
                  <Icon name="mdi:unfold-less-horizontal" class="cursor-pointer" />
                </span>
              </el-tooltip>
              <el-tooltip :content="$t('Delete Section')" placement="top" effect="light">
                <Icon name="mdi:trash-can-outline" class="ml-3 cursor-pointer" />
              </el-tooltip>
            </div>
          </div>

          <SectionNode
            v-show="item.collapse !== true"
            :sectionItem="item"
            :formId="form.id"
            :choosedSectionId="choosedSectionId"
          />
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form } from '~/types'
import { useSortable, moveArrayElement } from '@vueuse/integrations/useSortable'

const props = defineProps<{ form: Form }>()
const sectionStore = useSectionStore()
const { sections } = storeToRefs(sectionStore)
const elementStore = useElementStore()

const sortableBoxRef = ref<HTMLElement | null>(null)
const choosedSectionId = ref<number | null>(null)

const listLoading = ref(false)

const orderSections = computed(() => {
  if (sections.value !== null && props.form !== null) {
    return useOrder(props.form.section_order, sections.value)
  } else {
    return []
  }
})

useWatchNull(sections, listLoading, async () => {
  await sectionStore.fetchSections(props.form.id)
  await elementStore.fetchElements(props.form.id)
})

onClickOutside(sortableBoxRef, () => choosedSectionId.value = null)

useSortable(sortableBoxRef, orderSections.value,  {
    animation: 150,
    handle: '.drag-handler',
    onUpdate: (e: any) => {
      moveArrayElement(orderSections.value, e.oldIndex, e.newIndex)

      nextTick(() => {
        const orders = orderSections.value.map(item => item.id)
        sectionStore.updateOrder(props.form.id, orders)
      })
    }
  })

const hanldeSectionCollapse = (sectionId: number) => {
  if (sections.value) {
    sections.value = sections.value.map(item => {
      if (item.id == sectionId) {
        item.collapse = !Boolean(item.collapse)
      }
      return item
    })
  }
}
</script>

<style lang="scss">
.section-list {
  min-height: 100px;
}

.section-box {
  &.focus {

    .section-head,
    .section-content {
      border-color: $primaryActiveColor;
    }
  }

  @apply pb-8
}

.section-head {
  background-color: $primaryHoverColor;
  border: 1px solid $primaryHoverColor;
  border-radius: 6px 6px 0 0;

  @apply flex items-center justify-between p-4;
}

.section-order {
  color: $textColor;
  @apply ml-2;
}

.drag-handler {
  @apply cursor-move p-2;
}
</style>