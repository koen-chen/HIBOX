<template>
  <el-container class="h-full">
    <el-header style="padding: 0">
      <div class="header">
        <div class="h-full flex items-center">
          <div class="logo-wrapper">
            <img class="logo" :src="logoSrc" />
          </div>
          <Translate dark />
        </div>

        <Account dark v-if="account !== null" />
      </div>
    </el-header>

    <el-main>
      <div class="w-4/6 m-auto">
        <slot />
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const { account } = storeToRefs(accountStore)

const logoSrc = ref('/logo-w.png')
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

.logo-wrapper {
  height: 100%;
}

.logo {
  display: block;
  height: 100%;
}
</style>