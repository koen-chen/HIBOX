<template>
  <div class="py-6">
    <Header backUrl="/forms">
      {{ currentForm.name }}
    </Header>

    <div><el-divider /></div>

    <div class="mt-8">
      <el-row :gutter="24" class="pr-24">
        <el-col :span="6" class="label">
          {{ $t('Basic Info') }}
        </el-col>

        <el-col :span="18" >
          <el-form label-position="top" :model="currentForm">
            <el-form-item prop="name" :label="$t('Name').toUpperCase()" :rules="[{ required: true, message: $t('Please input name') }]">
              <el-input v-model="currentForm.name" @blur="() => updateBasicInfo('name')" size="large" />
            </el-form-item>
            <el-form-item prop="description" :label="$t('Description').toUpperCase()" class="mt-8">
              <el-input v-model="currentForm.description" @blur="() => updateBasicInfo('description')" type="textarea" rows="4" />
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
            <SectionList />
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

watch(() => route.params.id, async (newId) => {
  formStore.$reset()
  await formStore.getForm(Number(newId))
}, { immediate: true })

const updateBasicInfo = (key: 'name' | 'description') => {
  formStore.updateForm(formId, {
    [key]: currentForm.value[key]
  })
}

const addSection = async () => {
  addLoading.value = true

  await sectionStore.addSection({
    name: 'Untitled Section',
    form_id: formId
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