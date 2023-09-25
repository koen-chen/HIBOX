<template>
   <div class="node-wrapper">
      <div v-if="props.drag" class="icon-box move cursor-pointer">
        <Icon name="mdi:drag-vertical" />
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  drag?: boolean
}>(), {
  drag: true
})
</script>

<style lang="scss" scoped>
.node-wrapper {
  width: 100%;
  margin-top: 1rem;

  @apply w-full flex items-center;

  .icon-box {
    width: 2rem;
    cursor: move;
    @apply flex items-center flex-none;
  }

  .content {
    width: 100%;
    padding: 0.8rem 0;

    @apply flex-grow;
  }
}
</style>