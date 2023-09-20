<template>
  <div class="header py-10">
    <div class="w-3/5 mx-auto flex items-center justify-center">
      <div v-if="props.back" class="flex-none">
        <el-button text @click="navigateTo(props.backUrl)">
          <Icon name="mdi:arrow-left" />
          <span class="ml-2">{{ $t('Back') }}</span>
        </el-button>
      </div>

      <div class="flex-grow"><slot /></div>

      <div class="flex-none">
        <slot name="actions" />
      </div>
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

<style lang="scss" scoped>
.header {
  position: relative;
  background: #fff;
  z-index: 1000;
  border-bottom: 1px solid $borderColor;
}
</style>