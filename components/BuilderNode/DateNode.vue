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

const { t } = useI18n()

const placeholder = computed(() => {
  return props.birthday? t('Input birthday') : t('Input day')
})
</script>