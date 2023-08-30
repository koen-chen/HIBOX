<template>
  <div>
    <div class="section-list" ref="container" v-loading="loading" >
      <TransitionGroup name="list">
        <div v-for="(item, index) in props.sections" :key="item.id" class="section-box relative overflow-hidden">
          <div class="section-head relative z-50">
            <div class="flex-grow flex items-center">
              <div class="drag-handler">
                <Icon name="mdi:drag-horizontal" />
              </div>
              <div class="section-order">Section {{ index + 1 }} of {{ props.sections.length }}</div>
            </div>

            <div>
              <el-tooltip :content="$t('Collapse Section')" placement="top" effect="light">
                <span @click="() => $emit('collapse', item.id)">
                  <Icon name="mdi:unfold-less-horizontal" class="cursor-pointer" />
                </span>
              </el-tooltip>
              <el-tooltip :content="$t('Delete Section')" placement="top" effect="light">
                <Icon name="mdi:trash-can-outline" class="ml-3 cursor-pointer" />
              </el-tooltip>
            </div>
          </div>

          <div class="section-content" v-show="item.collapse !== true">
            <div>
              <el-input v-model="item.name" class="border-input" />
              <el-input v-model="item.description" placeholder="Description (optional)" class="border-input"
                type="textarea" autosize />
            </div>
            <div>
              <ElementList :sectionId="item.id" />
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <div class="mt-9">
      <el-button type="primary" size="large" @click="addSection">
        <Icon name="mdi:plus-circle" />
        <span class="pl-2">{{ $t('Add Section') }}</span>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { useSortable, moveArrayElement } from '@vueuse/integrations/useSortable'

defineEmits(['collapse'])

const props = defineProps({
  templateId: String,
  sections: {
    type: Array,
    default: null
  }
})

const sectionsStore = useSectionsStore()
const container = ref(null)
const loading = ref(true)


watch(props.sections, () => {
  loading.value = false
})

useSortable(container, props.sections, {
  animation: 150,
  handle: '.drag-handler',
  onUpdate: (e) => {
    moveArrayElement(props.sections, e.oldIndex, e.newIndex)

    nextTick(() => {
      sectionsStore.updateOrder(props.templateId, props.sections.map(item => item.id))
    })
  }
})

const addSection = () => {
  sectionsStore.addSection({
    name: 'Untitled Section',
    template_id: props.templateId
  })
}
</script>

<style lang="scss">
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.list-leave-active {
  position: absolute;
}

.section-list {
  min-height: 100px;
}

.section-box:nth-child(n + 2) {
  @apply mt-8
}

.section-head {
  background-color: $primaryHoverColor;
  border-radius: 6px 6px 0 0;

  @apply flex items-center justify-between p-4;
}

.section-order {
  color: $textColor;
  @apply ml-2;
}

.section-content {
  width: 100%;
  border: 1px solid $primaryHoverColor;
  background-color: $maskColor;
  border-radius: 0 0 6px 6px;

  @apply p-4 flex items-center;

  .border-input {
    border-bottom: 1px solid $borderColor;

    @apply mb-3;
  }

  .el-input__wrapper,
  .el-textarea__inner {
    background-color: transparent;
    box-shadow: none;
    resize: none;
  }
}

.section-box:focus {
  .section-head {
    background-color: $primaryActiveColor;
  }

  .section-content {
    border: 1px solid $primaryActiveColor;
  }
}

.drag-handler {
  @apply cursor-move p-2;
}
</style>