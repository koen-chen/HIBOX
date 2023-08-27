<template>
  <div class="header">
    <img class="logo" src="/logo-w.png" />

    <div>
      <el-button @click="logout" dark>logout</el-button>
    </div>
  </div>
</template>

<script setup>
import { useAccountStore } from '@/stores/account'

const accountStore = useAccountStore()

const logout = async () => {
  const { error } = await accountStore.logout()

  if (error) {
    console.log(error)
  } else {
    navigateTo('/login')
  }
}
</script>

<style lang="scss" scoped>
.header {
  color: $containerBg;
  height: 64px;
  background-color: $primary;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);

  @apply flex justify-between items-center px-8;
}

.logo {
  display: inline-block;
  height: 80%;
}
</style>