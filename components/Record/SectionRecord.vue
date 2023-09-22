<template>
  <div
    class="w-full section"
    :class="[`record-${props.record.id}`, { 'is-hovered': (isHovered || isFocused) }]"
    ref="activeRef"
  >
    <div class="section-head p-4">
      Section {{ props.order }}
    </div>

    <div class="p-4">
      <div
        class="section-body p-8"
        @click="focusSection"
        ref="focusRef"
      >
        <div v-if="!isFocused">
          <div class="py-3 text-2xl">{{ props.record.name }}</div>
          <div class="py-3">{{ props.record.description }}</div>
        </div>

        <div v-if="isFocused">
          <el-input
            v-model="props.record.name"
            @blur="() => updateBasicInfo('name')"
            class="mb-4"
            size="large"
          />
          <el-input
            v-model="props.record.description"
            @blur="() => updateBasicInfo('description')"
            placeholder="Description (optional)"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
          />
        </div>
      </div>

      <div v-if="isFocused" class="mt-4">
        <NodeCreator
          :formId="props.record.form_id"
          :sectionId="props.record.id"
          :afterElement="{
            type: 'Section',
            id: props.record.id
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SectionType } from '~/types';

const props = defineProps<{
  record: SectionType,
  order: number
}>()

const sectionStore = useSectionStore()
const isFocused = ref(false)
const activeRef = ref()
const isHovered = useElementHover(activeRef)
onClickOutside(activeRef, () => isFocused.value = false)

function focusSection() {
  isFocused.value = true
}

function updateBasicInfo(key: 'name' | 'description') {
  sectionStore.updateSection(props.record.id, {
      [key]: key == 'name' ? props.record.name : props.record.description
  })
}
</script>

<style lang="scss" scoped>
.section-head {
  background-color: $primaryHoverColor;
  opacity: 0.6;
}
.is-hovered {
  .section-body {
    background-color: $maskColor;
    cursor: pointer;
  }
}
</style>