<template>
  <el-dropdown @command="handleChange">
    <span class="outline-none flex items-center">
      <Icon :class="{ 'text-white' : dark }" name="mdi:translate" size="18px" />
      <Icon :class="{ 'text-white': dark }" name="mdi:chevron-down" size="18px" />
    </span>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :style="{ color: locale == 'zh' ? '#000' : '#999' }" command="zh">简体中文</el-dropdown-item>
        <el-dropdown-item :style="{ color: locale == 'en' ? '#000' : '#999' }" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
defineProps<{
  dark: boolean
}>()

const { locale } = useI18n({ useScope: 'global' })

locale.value = sessionStorage.getItem('lang') || 'zh'

function handleChange(cmd: string) {
  locale.value = cmd
  sessionStorage.setItem('lang', cmd)
}
</script>