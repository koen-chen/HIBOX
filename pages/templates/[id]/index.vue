<template>
  <div>
    <el-page-header @back="handleBack">
      <template #content>
        <div class="w-full text-center text-large font-600 py-4">
        </div>
      </template>
    </el-page-header>

    <el-divider></el-divider>

    <div class="mt-8">
      <el-row :gutter="24">
        <el-col :span="6" class="label">
          {{ $t('Basic Info') }}
        </el-col>
        <el-col :span="18">
          <el-form label-position="top" :model="currentTemplate">
            <el-form-item prop="name" :label="$t('Name').toUpperCase()" :rules="[{ required: true, message: $t('Please input name') }]">
              <el-input v-model="currentTemplate.name" @blur="() => updateBasicInfo('name')" size="large" />
            </el-form-item>
            <el-form-item prop="description" :label="$t('Description').toUpperCase()" class="mt-8">
              <el-input v-model="currentTemplate.description" @blur="() => updateBasicInfo('description')" type="textarea" rows="4" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-divider class="py-5"></el-divider>

      <div class="affix-container">
        <el-row :gutter="24">
          <el-col :span="6" class="label">
            {{ $t('Edit Sections') }}
          </el-col>
          <el-col :span="18">
            <SectionList
              :sections="orderSections"
              :templateId="route.params.id"
              :loading="loading"
              @collapse="hanldeSectionCollapse"
            />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const templatesStore = useTemplatesStore()
const loading = ref(false)
const { currentTemplate, orderSections } = storeToRefs(templatesStore)

onMounted(async () => {
  if (!currentTemplate.value?.id) {
    loading.value = true
    await templatesStore.getTemplate(route.params.id.toString())
    loading.value = false
  }
})

const updateBasicInfo = (key: 'name' | 'description') => {
  templatesStore.updateTemplate(route.params.id.toString(), {
    [key]: currentTemplate.value[key]
  })
}

const hanldeSectionCollapse = (sectionId: string) => {
  templatesStore.$patch({
    orderSections: orderSections.value.map(item => {
      if (item.id == sectionId) {
        item.collapse = !Boolean(item.collapse)
      }
      return item
    })
  })
}

const handleBack = () => {
  navigateTo('/templates')
}
</script>

<style lang="scss">
.label {
  font-family: 'Montserrat';
  font-weight: 800;
  font-size: 1.714rem;
  line-height: 1.33;
  letter-spacing: .2px;
  color: $textColor;
  display: flex;
}

.affix-container {
  height: 3000px;
}
</style>