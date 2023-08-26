<template>
  <div class="flex justify-center items-center h-full">
    <el-form label-position="top" label-width="100px" :model="formModal" class="w-96">
      <el-text type="primary" class="form-title" tag="div">Login</el-text>

      <el-form-item label="Email">
        <el-input v-model="formModal.email" disabled />
      </el-form-item>
      <el-form-item label="Password" disabled>
        <el-input type="password" v-model="formModal.password" disabled />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="signIn" :loading="loginLoading">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'account'
})

const accountStore = useAccountStore()

const formModal = ref({
  email: 'koen@demo.com',
  password: '12345678'
})

const loginLoading = ref(false)

const signIn = async () => {
  loginLoading.value = true

  const { error } = await accountStore.login({
    email: formModal.value.email,
    password: formModal.value.password,
  })

  if (error) {
    console.log(error)
  } else {
    loginLoading.value = false
    navigateTo('/')
  }
}
</script>

<style lang="scss" scoped>
.form-title {
  font-family: 'Playfair Display';
  font-weight: 900;
  font-size: 4rem;
  line-height: 4rem;
  margin-bottom: 2rem;
}
</style>