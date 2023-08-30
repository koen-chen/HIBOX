<template>
  <div class="header">
    <div class="h-full flex items-center">
      <Logo src="/logo-w.png" class="mr-4" />
      <Translate dark />
    </div>

    <Account dark v-if="account !== null" />
  </div>
</template>

<script setup>
const accountStore = useAccountStore()
const { account } = storeToRefs(accountStore)
</script>

<style lang="scss" scoped>
.header {
  color: $containerBgColor;
  height: 64px;
  background-color: $primaryColor;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2),
  0 4px 5px 0 rgba(0, 0, 0, .14),
  0 1px 10px 0 rgba(0, 0, 0, .12);

  @apply flex justify-between items-center px-8 z-50 relative;
}
</style>