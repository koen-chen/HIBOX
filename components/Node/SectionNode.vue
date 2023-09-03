<template>
  <div class="section-node">
    <div class="section-content">
      <div>
        <el-input v-model="item.name" class="border-input" />
        <el-input v-model="item.description" placeholder="Description (optional)" class="border-input" type="textarea"
          autosize />
      </div>
      <div>
        {{ item.id }}
        <ElementList
          v-if="elements"
          :formId="props.formId"
          :section="item"
        />
      </div>
    </div>

    <div v-if="choosedSectionId == item.id">
      <el-button @click="() => addElement(item.id)">add question</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Section } from '~/types'

interface Props {
  item: Section,
  formId: number,
  choosedSectionId?: number
}

const props = defineProps<Props>()
const elementStore = useElementStore()
const { elements } = storeToRefs(elementStore)

const addLoading = ref(false)
const addElement = async (sectionId: number) => {
  addLoading.value = true

  await elementStore.addElement({
    label: '',
    type: '',
    section_id: sectionId,
    form_id: props.formId
  })

  nextTick(() => {
    addLoading.value = false
  })
}
</script>

<style lang="scss">
.section-node {
  &.focus {
    .section-head,
    .section-content {
      border-color: $primaryActiveColor;
    }
  }

  @apply pb-8
}

.section-content {
  width: 100%;
  border: 1px solid $primaryHoverColor;
  border-top: none;
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
</style>