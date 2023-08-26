<template>
  <el-container class="h-full">
    <el-header height="64px" class="customize-header">
      <div class="logo-wrapper">
        <img class="logo" src="/haibox_logo.png" />
      </div>
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
  margin-top: 0px;
  transform: translateY(0px);
  left: 0px;
  right: 0px;
  background-color: rgb(255, 255, 255);
  border-color: rgb(255, 255, 255);
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);


  .logo-wrapper {
    padding: 5px 2rem;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .logo {
    display: block;
    max-height: 100%;
  }
}
</style>