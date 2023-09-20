<template>
  <div class="min-h-screen">
    <div class="header">
      <div class="h-full flex items-center">
        <div class="logo-wrapper">
          <img class="logo" :src="logoSrc" />
        </div>

        <Translate dark />
      </div>

      <Account dark v-if="account !== null" />
    </div>

    <div>
      <slot />

      <el-backtop :right="50" :bottom="50" />
    </div>
  </div>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const { account } = storeToRefs(accountStore)

const logoSrc = ref('/logo-w.png')
</script>

<style lang="scss" scoped>
.header {
  color: $containerBgColor;
  height: 60px;
  background-color: $primaryColor;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2),
    0 4px 5px 0 rgba(0, 0, 0, .14),
    0 1px 10px 0 rgba(0, 0, 0, .12);

  @apply flex justify-between items-center px-8 z-50 relative;
}

.logo-wrapper {
  height: 70%;
  margin-right: 10px;
}

.logo {
  display: block;
  height: 100%;
}
</style>