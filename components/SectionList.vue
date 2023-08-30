<template>
  <div class="section-list relative">
    <div ref="container">
      <div v-for="(item, index) in props.sections" :key="item.id"
        class="section-box relative overflow-hidden">
        <div class="section-head relative z-50">
          <div class="flex-grow flex items-center">
            <div class="drag-handler">
              <Icon name="mdi:drag-horizontal" />
            </div>
            <div class="section-order">Section {{ index + 1 }} of {{ props.sections.length }}</div>
          </div>

          <div>
            <el-tooltip :content="$t('Collapse Section')" placement="top" effect="light"  >
              <span @click="() => $emit('collapse', item.id)">
                <Icon name="mdi:unfold-less-horizontal" class="cursor-pointer" />
              </span>
            </el-tooltip>
            <el-tooltip :content="$t('Delete Section')" placement="top" effect="light" >
              <Icon name="mdi:trash-can-outline" class="ml-3 cursor-pointer" />
            </el-tooltip>
          </div>
        </div>
        <Transition name="section" type="animation">
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
        </Transition>
      </div>
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
    default: []
  }
})

const sectionsStore = useSectionsStore()
const container = ref(null)

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
@keyframes slideOutUp {
  0% {
    transform: translate3d(0, 0, 0);
    position: relative;
    opacity: 1;
  }

  40% {
    transform: translate3d(0, -40%, 0);
    opacity: 0.8;
  }

  80% {
    transform: translate3d(0, -80%, 0);

    opacity: 0.4;
  }

  100% {
    opacity: 0;
    position: absolute;
    transform: translate3d(0, -100%, 0);
  }
}

@keyframes slideInDown {
  0% {
    visibility: hidden;
    transform: translate3d(0, -100%, 0);
  }

  100% {
    transform: translate3d(0, 0, 0);
  }
}

.section-enter-active {
  animation-fill-mode: forwards;
  animation: 0.5s linear slideInDown;
}

.section-leave-active {
  animation-fill-mode: forwards;
  animation: 0.5s linear slideOutUp;
}

.section-list {
  transition: all ease 1s;
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