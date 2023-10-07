<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n({ useScope: 'global' })

locale.value = sessionStorage.getItem('lang') || 'zh'
</script>