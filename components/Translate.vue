<template>
  <el-dropdown @command="(command) => locale = command">
    <span class="outline-none">
      <Icon :class="{ 'text-white' : dark }" name="mdi:translate" size="20px" />
      <Icon :class="{ 'text-white': dark }" name="mdi:chevron-down" size="20px" />
    </span>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :style="{ color: locale == 'zh' ? '#000' : '#999' }" command="zh">简体中文</el-dropdown-item>
        <el-dropdown-item :style="{ color: locale == 'en' ? '#000' : '#999' }" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
defineProps({
  dark:  Boolean
})

const { locale } = useI18n()
</script>