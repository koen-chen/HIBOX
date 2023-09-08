<template>
  <div class="py-6">
    <Header backUrl="/forms">
      {{ formModal.name }}
    </Header>

    <div ><el-divider /></div>

    <div class="mt-8">
      <el-row :gutter="24" class="pr-24">
        <el-col :span="6" class="label">
          {{ $t('Basic Info') }}
        </el-col>

        <el-col :span="18" >
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

      <div class="py-10"><el-divider /></div>

      <div class="affix-container h-screen ">
        <el-row :gutter="24">
          <el-col :span="6" class="label">
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

          <el-col :span="18">
            <SectionList v-if="currentForm" :form="currentForm" />
            <div ref="bottomEl"></div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const formStore = useFormStore()
const { currentForm } = storeToRefs(formStore)
const sectionStore = useSectionStore()

const addLoading = ref(false)
const bottomEl = ref<HTMLDivElement>()

const formId = Number(route.params.id)
const formModal = ref({
  name: currentForm.value?.name,
  description: currentForm.value?.description
})

onMounted(async () => {
  if (currentForm.value == null) {
    const form = await formStore.getForm(formId)

    if (form) {
      formModal.value.name = form.name
      formModal.value.description = form.description
    }
  }
})

const updateBasicInfo = (key: 'name' | 'description') => {
  formStore.updateForm(formId, {
    [key]: formModal.value[key]
  })
}

const addSection = async () => {
  addLoading.value = true

  await sectionStore.addSection({
    name: 'Untitled Section',
    form_id: Number(route.params.id)
  })

  nextTick(() => {
    addLoading.value = false
    if (bottomEl.value) {
      bottomEl.value.scrollIntoView({ behavior: 'smooth' });
    }
  })
}
</script>

<style lang="scss">
.label {
  font-family: 'Radikal-Bold';
  font-weight: 900;
  font-size: 1.8rem;
  line-height: 1.4;
  color: $textColor;
  display: flex;
}
</style>