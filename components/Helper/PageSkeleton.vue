<template>
  <el-skeleton class="skeleton" animated :loading="props.loading">
    <template #template>
      <div class="m-auto bg-white w-full p-10">
        <el-skeleton-item v-for="item in props.count" :key="item" variant="h1" class="skeleton-item" />
      </div>
    </template>

    <template #default>
      <slot />
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  loading?: boolean
  count?: number
}>(), {
  loading: false,
  count: 5
})
</script>

<style lang="scss" scoped>
.skeleton {
  width: 800px;
  @apply m-auto p-20;
}

.skeleton-item {
  width: 100%;
  margin-bottom: 2rem;
}
</style>