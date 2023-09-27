<template>
  <div
    class="flex"
    :class="[{ 'is-hovered': (isHovered || isFocused) }]"
    ref="activeRef"
  >
    <div
      class="w-full form-basic px-12 py-8"
      @click="focusSection"
    >
      <div v-if="!isFocused">
        <div class="py-3 text-2xl">{{ props.record.name }}</div>
        <div class="py-3">{{ props.record.description }}</div>
      </div>

      <div v-else>
        <div class="mb-1">{{ $t('Form Name') }}</div>
        <el-input v-model="props.record.name" size="large" maxlength="50" @blur="updateBasicInfo('name')" />

        <div class="mt-8 mb-1">{{ $t('Form Description') }}</div>
        <el-input v-model="props.record.description" type="textarea" rows="4" @blur="updateBasicInfo('description')" />
      </div>

      <div v-if="isFocused" class="mt-4">
        <NodeCreator
          :formId="props.record.id"
          :afterElement="{
            type: 'Form',
            id: props.record.id
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormType } from '~/types';

const props = defineProps<{
 record: FormType
}>()

const formStore = useFormStore()

const isFocused = ref(false)
const activeRef = ref()
const isHovered = useElementHover(activeRef)
onClickOutside(activeRef, () => isFocused.value = false)

function focusSection() {
  isFocused.value = true
}

const updateBasicInfo = async (key: 'name' | 'description') => {
  if (props.record.name == '') {
    props.record.name = 'Untitled Form'
  }

  await formStore.updateForm(props.record.id, {
    [key]: key == 'name' ? props.record.name : props.record.description
  })
}
</script>

<style lang="scss">
.form-basic {
  border-top: 4px solid transparent;
}

.is-hovered {
  .form-basic {
    border-top: 4px solid $primaryColor;
    background-color: $maskColor;
    cursor: pointer;
  }
}
</style>