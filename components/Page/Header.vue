<template>
  <div class="flex items-center">
    <div v-if="props.back" class="flex-none">
      <el-button text @click="navigateTo(props.backUrl)">
        <Icon name="mdi:arrow-left" />
        <span class="ml-2">{{ $t('Back') }}</span>
      </el-button>
    </div>

    <div class="flex-none">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  back?: boolean
  backUrl?: string
}>(), {
  back: true,
  backUrl: '/'
})
</script>
