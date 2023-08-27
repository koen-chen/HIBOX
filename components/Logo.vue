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
  padding: 5px 2rem;
  height: 100%;
  display: flex;
  align-items: center;
}

.logo {
  display: block;
  max-height: 100%;
}
</style>