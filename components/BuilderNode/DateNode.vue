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
  birthday?: boolean
}>(),{
  birthday: false
})

const placeholder = computed(() => {
  return props.birthday? 'Enter input birthday' : 'Enter input day'
})
</script>