<template>
  <div
    class="w-full section"
    :class="[`record-${props.record.id}`, { 'is-hovered': (isHovered || isFocused) }]"
    ref="activeRef"
  >
    <div class="section-head p-4 flex items-center justify-between">
      <div><span>{{ $t('Section') }}</span> {{ props.order }}</div>
      <div class="cursor-pointer">
        <el-dropdown trigger="click" @command="handleCommand">
          <el-icon><MoreFilled /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="move">{{ $t('Move Section') }}</el-dropdown-item>
              <el-dropdown-item command="delete">{{ $t('Delete Section') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div class="px-4 py-2">
      <div
        class="section-body px-8 py-4"
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
          :afterElement="{
            type: 'Section',
            id: props.record.id,
            sectionId: props.record.id
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SectionType } from '~/types';
import { MoreFilled } from '@element-plus/icons-vue'

const props = defineProps<{
  record: SectionType,
  order: number
}>()

const sectionStore = useSectionStore()
const { latestSectionId } = storeToRefs(sectionStore)
const isFocused = ref(false)
const activeRef = ref()
const isHovered = useElementHover(activeRef)
const focusRef = ref()

onClickOutside(activeRef, () => isFocused.value = false)

function focusSection() {
  isFocused.value = true
}

watchPostEffect(() => {
  isHovered.value = false
  if (latestSectionId.value == props.record.id) {
    focusRef.value.click()
    focusRef.value.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }
})

function updateBasicInfo(key: 'name' | 'description') {
  sectionStore.updateSection(props.record.id, {
      [key]: key == 'name' ? props.record.name : props.record.description
  })
}

function deleteSection() {
  sectionStore.deleteSection(props.record.id, props.record.form_id)
}

function handleCommand(command: string) {
  if (command == 'delete') {
    deleteSection()
  }
}
</script>

<style lang="scss" scoped>
.section-head {
  background-color: $primaryHoverColor;
  opacity: 0.8;
}

.section-body {
  border-top: 4px solid transparent;
}
.is-hovered {
  .section-body {
    border-top: 4px solid $primaryColor;
    background-color: $maskColor;
    cursor: pointer;
  }
}
</style>