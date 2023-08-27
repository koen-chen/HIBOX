<template>
  <el-dropdown @command="handleAccountCommand">
    <span class="outline-none">
      <Icon :class="{ 'text-white': dark }" name="mdi:account-circle" size="32px" />
    </span>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="logout">{{ $t('Logout') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
defineProps({
  dark: Boolean
})

import { useAccountStore } from '@/stores/account'

const accountStore = useAccountStore()

const handleAccountCommand = (command) => {
  switch (command) {
    case 'logout':
      logout()
      break;

    default:
      break;
  }
}

const logout = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  const { error } = await accountStore.logout()

  if (error) {
    console.log(error)
  } else {
    navigateTo('/login')
  }

  loading.close()
}
</script>