<template>
  <div class="py-6">
    <PageHeader>
      {{ formModal.name }}
    </PageHeader>

    <el-divider></el-divider>

    <div class="mt-8">
      <el-row :gutter="24">
        <el-col :span="5" class="label">
          {{ $t('Basic Info') }}
        </el-col>
        <el-col :span="19">
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
          <el-col :span="5" class="label">
            <div class="mb-6">{{ $t('Edit Sections') }}</div>
            <el-affix target=".affix-container" :offset="100">
              <div key="addSectionBtn">
                <el-button type="primary" size="large" @click="addSection" :loading="addLoading">
                  <Icon name="mdi:plus-circle" />
                  <span class="pl-2">{{ $t('Add Section') }}</span>
                </el-button>
              </div>
            </el-affix>
          </el-col>
          <el-col :span="19">
            <SectionList
              :sections="orderSections"
              :formId="Number(route.params.id)"
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
const formStore = useFormStore()
const sectionStore = useSectionStore()

const { currentForm } = storeToRefs(formStore)
const { sections } = storeToRefs(sectionStore)

const loading = ref(false)
const addLoading = ref(false)

const orderSections = computed(() => {
  if (sections.value !== null && currentForm.value !== null) {
    return useOrder(currentForm.value.section_order, sections.value)
  } else {
    return []
  }
})

const formModal = ref({
  name: currentForm.value?.name,
  description: currentForm.value?.description
})

useWatchNull(sections, loading, async () => {
  const formId = Number(route.params.id)
  const form = await formStore.getForm(formId)
  if (form) {
    formModal.value.name = form.name
    formModal.value.description = form.description
  }

  await sectionStore.fetchSections(formId)
})

const updateBasicInfo = (key: 'name' | 'description') => {
  formStore.updateForm(Number(route.params.id), {
    [key]: formModal.value[key]
  })
}

const hanldeSectionCollapse = (sectionId: number) => {
  if (sections.value) {
    sections.value = sections.value.map(item => {
      if (item.id == sectionId) {
        item.collapse = !Boolean(item.collapse)
      }
      return item
    })
  }
}

const addSection = async () => {
  addLoading.value = true

  await sectionStore.addSection({
    name: 'Untitled Section',
    form_id: Number(route.params.id)
  })

  nextTick(() => {
    addLoading.value = false
  })
}
</script>

<style lang="scss">
.label {
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 1.714rem;
  line-height: 1.33;
  letter-spacing: .2px;
  color: $textColor;
  display: flex;
}
</style>