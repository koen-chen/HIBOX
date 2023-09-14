<template>
  <div class="py-6">
    <Header backUrl="/forms"></Header>

    <div><el-divider /></div>

    <div class="mt-8">
      <el-row :gutter="24">
        <el-col :span="6" class="label">
          {{ $t('Basic Info') }}
        </el-col>

        <el-col :span="18">
          <div class="mb-1">{{ $t('Name').toUpperCase() }}</div>
          <el-input v-model="name" size="large" maxlength="50" />

          <div class="mt-8 mb-1">{{ $t('Description').toUpperCase() }}</div>
          <el-input v-model="description" type="textarea" rows="4" />

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
const sectionStore = useSectionStore()

const addLoading = ref(false)
const bottomEl = ref<HTMLDivElement>()
const formId = Number(route.params.id)

const name = ref('')
const description = ref('')

watchEffect(async () => {
  formStore.$reset()
  const result = await formStore.getForm(formId)

  name.value = result.name
  description.value = result.description
})

watchDebounced(name, (newVal, oldVal) => {
  if (newVal == '') {
    name.value = 'Untitled Form'
  }

 if (oldVal !== '') {
    updateBasicInfo('name')
 }
}, { debounce: 500 })

watchDebounced(description, () => {
  updateBasicInfo('description')
}, { debounce: 500 })

const updateBasicInfo = (key: 'name' | 'description') => {
  formStore.updateForm(formId, {
    [key]: key == 'name' ? name.value : description.value
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