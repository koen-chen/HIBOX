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
  textarea?: boolean
}>(),{
  textarea: false
})

const { t } = useI18n()
const placeholder = computed(() => {
  return props.textarea? t('Enter your long answer') : t('Enter your short answer')
})
</script>