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
          <el-form label-position="top" :model="formModal">
            <el-form-item prop="name" :label="$t('Name').toUpperCase()" :rules="[{ required: true, message: $t('Please input name') }]">
              <el-input v-model="formModal.name" @blur="() => updateBasicInfo('name')" size="large" />
            </el-form-item>
            <el-form-item prop="description" :label="$t('Description').toUpperCase()" class="mt-8">
              <el-input v-model="formModal.description" @blur="() => updateBasicInfo('description')" type="textarea" rows="4" />
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
              :templateId="Number(route.params.id)"
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
import { Section } from '~/types';

const route = useRoute()
const templateStore = useTemplateStore()
const sectionStore = useSectionStore()
const loading = ref(false)
const { currentTemplate } = storeToRefs(templateStore)
const { sections } = storeToRefs(sectionStore)
const orderSections = ref<Section[]>([])

const formModal = ref({
  name: currentTemplate.value?.name,
  description: currentTemplate.value?.description
})

onMounted(async () => {
  if (!currentTemplate.value?.id) {
    loading.value = true
    const templateId = Number(route.params.id)
    await templateStore.getTemplate(templateId)
    await sectionStore.fetchSections(templateId)
    orderSections.value = useOrder(currentTemplate.value?.section_order, sections.value)
    loading.value = false
  }
})

const updateBasicInfo = (key: 'name' | 'description') => {
  templateStore.updateTemplate(Number(route.params.id), {
    [key]: currentTemplate.value ? currentTemplate.value[key] : ''
  })
}

const hanldeSectionCollapse = (sectionId: number) => {
  orderSections.value = orderSections.value.map(item => {
    if (item.id == sectionId) {
      item.collapse = !Boolean(item.collapse)
    }
    return item
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