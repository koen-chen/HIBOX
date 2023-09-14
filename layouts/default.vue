<template>
  <el-container class="h-full">
    <el-header style="padding: 0">
      <div class="header">
        <div class="h-full flex items-center">
          <div class="logo-wrapper">
            <img class="logo" :src="logoSrc" />
          </div>

          <Translate dark />
        </div>

        <div class="title">
          {{ currentForm.name }}

          <span class="loading-status">{{  updateLoading ? 'Saving...' : '' }}</span>
        </div>

        <Account dark v-if="account !== null" />
      </div>
    </el-header>

    <el-main>
      <div class="w-4/6 m-auto">
        <slot />
      </div>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
const accountStore = useAccountStore()
const { account } = storeToRefs(accountStore)

const formStore = useFormStore()
const { currentForm, updateLoading } = storeToRefs(formStore)

const logoSrc = ref('/logo-w.png')
</script>


<style lang="scss" scoped>
.header {
  color: $containerBgColor;
  height: 80px;
  background-color: $primaryColor;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2),
    0 4px 5px 0 rgba(0, 0, 0, .14),
    0 1px 10px 0 rgba(0, 0, 0, .12);

  @apply flex justify-between items-center px-8 z-50 relative;
}

.logo-wrapper {
  height: 70%;
  margin-right: 10px;
}

.logo {
  display: block;
  height: 100%;
}

.title {
  font-family: 'Radikal-Bold';
  font-weight: 900;
  font-size: 1.8rem;
  color: #fff;

  @apply w-full text-center
}

.loading-status {
  font-size: 0.8rem;
  margin-left: 20px;
}
</style>