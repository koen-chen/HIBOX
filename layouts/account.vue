<template>
  <el-container class="h-full">
    <el-header height="64px" class="flex items-center justify-between customize-header">
      <Logo />

      <Translate />
    </el-header>
    <el-container>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.customize-header {
  background-color: rgb(255, 255, 255);
  border-color: rgb(255, 255, 255);
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2),
    0 4px 5px 0 rgba(0, 0, 0, .14),
    0 1px 10px 0 rgba(0, 0, 0, .12);
}


</style>