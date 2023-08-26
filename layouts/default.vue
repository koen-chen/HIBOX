<template>
  <el-container class="h-full">
    <el-aside width="200px" class="h-full">
      <Menu />
    </el-aside>
    <el-container>
      <el-header style="padding: 0">
        <Header />
      </el-header>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container></template>