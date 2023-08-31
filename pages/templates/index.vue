<template>
  <div class="p-4">
    <el-page-header :icon="null" @back="handleBack">
      <template #title>
        <div class="text-center font-black py-4 text-2xl">{{ $t('TEMPLATE GALLERY') }}</div>
      </template>
    </el-page-header>

    <el-divider></el-divider>

    <el-space wrap class="mt-8">
      <div class="cardCover" @click="createBlankTemplate" v-loading="createLoading">
        <Icon name="mdi:plus-circle" size="2.6rem" />
        <span class="cardTitle">{{ $t('Blank') }}</span>
        <span class="cardDesc">{{ $t('Start a new template') }}</span>
      </div>

      <div v-for="item in galleries" @click="previewTemplate(item)">
        <div class="cardCover2">
          <div class="cardTitle">{{ item.name }}</div>
          <div class="cardDesc">{{ item.description }}</div>
        </div>
      </div>
    </el-space>
  </div>
</template>

<script setup lang="ts">
const templateStore = useTemplatesStore()
const createLoading = ref(false)
const { currentTemplate, galleries } = storeToRefs(templateStore)

onMounted(() => {
  templateStore.fetchTemplates()
})

const createBlankTemplate = async () => {
  createLoading.value = true

  await templateStore.createTemplate({
    name: 'Untitled Template'
  })

  createLoading.value = false

  if (currentTemplate.value?.id) {
    navigateTo(`/templates/${currentTemplate.value.id}`)
  } else {
    ElMessage({
      showClose: true,
      message: 'Oops, create template failure!',
      type: 'error',
    })
  }
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

