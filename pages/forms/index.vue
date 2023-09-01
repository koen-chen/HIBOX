<template>
  <div class="p-4">
    <el-page-header :icon="null" @back="handleBack">
      <template #title>
        <div class="text-center font-black py-4 text-2xl">{{ $t('Forms') }}</div>
      </template>

      <template #extra>
        <el-button @click="createBlankForm">New Form</el-button>
      </template>
    </el-page-header>

    <el-divider></el-divider>

    <div class="mt-8" v-loading="loading">
      <div v-for="item in forms">
        <div class="cardCover2">
          <div class="cardTitle">{{ item.name }}</div>
          <div class="cardDesc">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const formStore = useFormStore()
const sectionStore = useSectionStore()
const createLoading = ref(false)
const { forms } = storeToRefs(formStore)
const loading = ref(false)

onMounted(() => {
  loading.value = true
  console.log('dddd')
  setTimeout(async () => {
    await formStore.fetchForms()
    loading.value = false
  }, 3000)

  console.log(loading.value)
})

const createBlankForm = async () => {
  createLoading.value = true

  const form = await formStore.createForm({
    name: 'Untitled Form'
  })

  if (form) {
    await sectionStore.addSection({
      name: 'Untitled Section',
      form_id: form.id
    })

    navigateTo(`/forms/${form.id}`)
  } else {
    ElMessage({
      showClose: true,
      message: 'Oops, create form failure!',
      type: 'error',
    })
  }

  createLoading.value = false
}

const handleBack = () => {
  navigateTo('/')
}
</script>

<style lang="scss" scoped>
.cardTitle {
  font-family: 'Radikal-Regular';
  font-size: 1rem;
  font-weight: 500;
  color: $textColor;
  margin-top: 1.143rem;
  line-clamp: 2;
  word-break: break-all;
}

.cardDesc {
  font-family: "Radikal-Regular";
  font-size: 0.857rem;
  color: $textSecondaryColor;
  line-clamp: 2;
  word-break: break-all;
}

.cardCover {
  width: 17.214rem;
  height: 12rem;
  margin-bottom: 1.143rem;
  border-radius: 4px;
  border: 1px solid $borderColor;
  background-color: $maskColor;
  cursor: pointer;

  @apply flex items-center flex-col justify-center content-center
}

.cardCover2 {
  width: 17.214rem;
  height: 12rem;
  margin-bottom: 1.143rem;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid $borderColor;
  background-color: $maskColor;
  cursor: pointer;
  overflow: hidden;

  .cardTitle {
    margin-top: 0;
    margin-bottom: 2rem;
    font-size: 1rem;
  }
}
</style>

