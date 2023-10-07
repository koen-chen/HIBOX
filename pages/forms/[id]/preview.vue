<template>
  <div class="pb-40 preview-wrapper">
    <el-affix :offset="0">
      <Header :backUrl="`/forms/${currentForm.id}`">
      </Header>
    </el-affix>

    <div class="mx-auto preview-content">
      <PageSkeleton :loading="loading">
        <div class="form-info">
          <div class="form-title">{{ currentForm.name }}</div>
          <div class="form-desc">{{ currentForm.description }}</div>
        </div>

        <template v-for="(sRecord, sIndex) in orderSectionList" :key="sRecord.id" >
          <div class="section-box" v-if="sIndex == activeSection">
            <div class="section-info">
              <div class="section-title">{{ sRecord.name }}</div>
              <div class="section-desc">{{ sRecord.description }}</div>
            </div>

            <QuestionListPresenter
              :list="questionList"
              :order="sRecord.question_order"
            >
              <template #default="{ list }">
                <el-form label-position="top" :model="list" :ref="(el: FormInstance) => { formRef = el }">
                  <el-form-item
                    v-for="(qRecord, qIndex) in list"
                    :key="qRecord.id"
                    :required="qRecord.required"
                    :label="(qIndex + 1) + '. '+ qRecord.label"
                    :prop="`${qIndex}.value`"
                    :rules="[
                      { required: qRecord.required, message: `${qRecord.label} is required` },
                    ]"
                  >
                    <QuestionPresenter
                      :record="qRecord"
                      :order="qIndex + 1"
                      class="pb-5"
                    />
                  </el-form-item>

                  <el-form-item class="pt-10">
                    <el-button v-if="activeSection != 0"
                      size="large"
                      @click="handleSectionBack"
                    >
                      {{ $t('Back') }}
                    </el-button>

                    <el-button v-if="activeSection != (sectionList.length - 1)"
                      size="large"
                      type="primary"
                      @click="handleSectionNext(formRef, list, sRecord.id)"
                    >
                      {{ $t('Next') }}
                    </el-button>

                    <el-button v-if="activeSection == (sectionList.length - 1)"
                      size="large"
                      type="primary"
                      @click="handleFormSubmit(formRef, list, sRecord.id)"
                    >
                      {{ $t('Submit') }}
                    </el-button>
                  </el-form-item>
                </el-form>
              </template>
            </QuestionListPresenter>
          </div>
        </template>
      </PageSkeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { QuestionType } from '~/types';

definePageMeta({
  layout: "preview",
});

const route = useRoute()
const formStore = useFormStore()
const { currentForm, sectionOrder, sectionList, questionList } = storeToRefs(formStore)

const orderSectionList = computed(() => useOrder(sectionOrder.value, sectionList.value))

const formId = route.params.id
const activeSection = ref(0)
const loading = ref(false)
const formRef = ref<FormInstance>()
const resultList = ref<{
  [key: string]: QuestionType[]
}>({})

const fetchData = loadingDecorator(formStore.getForm, loading)
watchEffect(async () => {
  const result = await fetchData(formId)
  if (result.id == '') {
    navigateTo('/forms')
  }
})

function handleSectionBack() {
  activeSection.value = activeSection.value - 1
}

async function handleSectionNext(formEl: FormInstance | undefined, list: QuestionType[], id: string) {
  if (!formEl) return
  const result = await checkFormValid(formEl)
  if (result.value == true) {
    resultList.value[id] = list
    activeSection.value = activeSection.value + 1
  }
}

async function handleFormSubmit(formEl: FormInstance | undefined, list: QuestionType[], id: string) {
  if (!formEl) return
  const result = await checkFormValid(formEl)
  if (result.value == true) {
    resultList.value[id] = list
  }
  console.log(resultList)
}

async function checkFormValid(formEl: FormInstance ) {
  const result = ref()
  await formEl.validate((valid, fields) => {
    if (valid) {
      result.value = true
    } else {
      result.value = fields
      console.log('error submit!', fields)
    }
  })

  return result
}
</script>

<style lang="scss" scoped>
.preview-wrapper {
  background-color: rgb(240, 240, 240);
}

.preview-content {
  width: 800px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  @apply my-10;
}

.form-info {
  color: #fff;
  background-color: $primaryColor;
  border-radius: 4px 4px 0 0;

  @apply p-10;
}

.form-title {
  font-weight: 900;
  font-size: 1.5rem;

  @apply mb-4;
}

.section-info {
  @apply mb-10;
}

.section-title {
  color: $primaryColor;
  font-weight: 900;
  font-size: 1.2rem;

  @apply mb-4;
}

.section-box {
  @apply p-10;
}</style>