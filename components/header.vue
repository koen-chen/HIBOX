<template>
  <div class="header">
    <img class="logo" src="/logo-w.png" />

    <div class="flex items-center justify-between">
      <el-dropdown class="mr-4" @command="(command) => locale = command">
          <span class="outline-none">
             <Icon class="text-white" name="mdi:translate" size="24px" />
             <Icon class="text-white" name="mdi:chevron-down" size="24px" />
          </span>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :style="{ color: locale == 'zh' ? '#000' : '#999' }" command="zh">简体中文</el-dropdown-item>
              <el-dropdown-item :style="{ color: locale == 'en' ? '#000' : '#999' }" command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      <el-dropdown @command="handleAccountCommand">
        <span class="outline-none">
           <Icon class="text-white" name="mdi:account-circle" size="32px" />
        </span>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item  command="logout">{{ $t('Logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useAccountStore } from '@/stores/account'
const { locale } = useI18n()

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

<style lang="scss" scoped>
.header {
  color: $containerBgColor;
  height: 64px;
  background-color: $primaryColor;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2),
  0 4px 5px 0 rgba(0, 0, 0, .14),
  0 1px 10px 0 rgba(0, 0, 0, .12);

  @apply flex justify-between items-center px-8;
}

.logo {
  display: inline-block;
  height: 80%;
}

</style>