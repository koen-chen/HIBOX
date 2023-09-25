<template>
  <NodeWrapper :drag="false">
    <el-input
      :placeholder="placeholder"
      :disabled="true"
      size="large"
    />
  </NodeWrapper>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  textarea?: boolean,
  readonly?: boolean
}>(),{
  textarea: false,
  readonly: false
})

const inputType = computed(() => {
  return props.textarea ? 'textarea' : 'text'
})

const placeholder = computed(() => {
  return props.textarea? 'Enter your long answer' : 'Enter your short answer'
})
</script>