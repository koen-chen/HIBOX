<template>
  <div>
    <el-page-header @back="handleBack">
      <template #content>
        <div class="w-full text-center text-large font-600 py-4">
          <el-input v-model="name" class="no-border w-96" @change="saveName">
            <template #suffix>
              <Icon name="mdi:edit" size="20" />
            </template>
          </el-input>
        </div>
      </template>
    </el-page-header>

    <el-divider></el-divider>

    <el-space wrap class="mt-8">
      <el-row :gutter="24">
        <el-col :span="12">
          BASIC INFO.
        </el-col>
        <el-col :span="12">

        </el-col>
      </el-row>
    </el-space>
  </div>
</template>

<script setup>
const route = useRoute()
const store = useTemplatesStore()
const { currentTemplate } = storeToRefs(store)

const name = ref('')

watch(currentTemplate, () => {
  if (currentTemplate.value != null) {
    name.value = currentTemplate.value.name
  } else {
    store.fetchTemplate(route.params.id)
  }
}, { immediate: true })

const saveName = () => {
  store.updateTemplate(route.params.id, name.value)
}

const handleBack = () => {
  navigateTo('/templates')
}
</script>

<style lang="scss">
.no-border {
  div {
    box-shadow: none;
  }

}
</style>