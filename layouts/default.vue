<template>
  <el-container class="h-full">
    <el-header style="padding: 0">
      <Header />
    </el-header>
    <el-main>
      <div class="w-3/5 m-auto">
        <slot />
      </div>
    </el-main>
  </el-container>
</template>