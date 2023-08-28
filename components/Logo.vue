<template>
  <div class="logo-wrapper">
    <img class="logo" :src="src" />
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    default: '/logo.png'
  }
})
</script>

<style lang="scss">
.logo-wrapper {
  height: 100%;
}

.logo {
  display: block;
  height: 100%;
}
</style>