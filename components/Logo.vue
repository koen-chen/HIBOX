<template>
  <div class="logo-wrapper">
    <img class="logo" :src="src" />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  src: string
}>(), {
  src: '/logo.png'
})
</script>

<style lang="scss" scoped>
.logo-wrapper {
  height: 100%;
}

.logo {
  display: block;
  height: 100%;
}
</style>