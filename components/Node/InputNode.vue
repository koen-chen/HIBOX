<template>
  <NodeWrapper>
    <el-input
      :model-value="props.modelValue"
      @input="(val: string | number) => emit('update:modelValue', val)"
      placeholder="Please enter a placeholder for this input"
      :type="inputType"
      :rows="props.rows"
      :autosize="props.autosize"
    />
  </NodeWrapper>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const props = withDefaults(defineProps<{
  modelValue: string | number | undefined
  textarea?: boolean
  rows?: number,
  readonly?: boolean,
  autosize?: Object | boolean
}>(),{
  textarea: false,
  rows: 1,
  readonly: false,
  autosize: false
})

const inputType = computed(() => {
  return props.textarea ? 'textarea' : 'text'
})
</script>