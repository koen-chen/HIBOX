<template>
  <el-dropdown @command="handleAccountCommand">
    <span class="outline-none">
      <Icon :class="{ 'text-white': dark }" name="mdi:account-circle" size="32px" />
      <span class="text-white ml-1 font-bold">Koen</span>
    </span>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="code" >
           <Icon name="mdi:github" size="16px" />
           <span class="ml-2">{{ $t('Code') }}</span>
        </el-dropdown-item>
        <el-dropdown-item command="logout" :icon="Plus">
          <Icon  name="mdi:logout-variant" size="16px" />
           <span class="ml-2">{{ $t('Logout') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useAccountStore } from '~/stores/account'

defineProps<{
  dark: boolean
}>()

const accountStore = useAccountStore()

const handleAccountCommand = (command: string) => {
  switch (command) {
    case 'logout':
      logout()
      break;

    case 'code':
      window.open('https://github.com/koen-chen/HIBOX')
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

  await accountStore.logout()
  loading.close()

  navigateTo('/')
}
</script>