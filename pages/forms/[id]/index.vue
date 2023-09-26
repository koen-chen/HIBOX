<template>
  <div class="pb-40 edit-wrapper">
    <el-affix :offset="0">
      <Header backUrl="/forms">
        <div class="title">
          {{ currentForm.name }}
        </div>

        <template #actions>
          <div>
            <el-button :icon="View" text @click="previewForm">Preview</el-button>
          </div>
        </template>
      </Header>
    </el-affix>

    <div class="mx-auto min-h-screen edit-content">
      <PageSkeleton :loading="loading">
        <FormBuilder :record="currentForm" class="section-wrapper" />

        <div class="section-list" ref="sortableRef">
          <div v-for="(sRecord, sIndex) in sectionList" :key="sRecord.id" class="section-wrapper">
            <SectionBuilder
              :record="sRecord"
              :order="sIndex + 1"
            >
            </SectionBuilder>

            <div v-for="(qRecord, qIndex) in questionList[sRecord.id]" :key="qRecord.id">
              <QuestionBuilder
                :record="qRecord"
                :order="qIndex + 1"
              ></QuestionBuilder>
            </div>
          </div>
        </div>
      </PageSkeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { View } from '@element-plus/icons-vue';

const route = useRoute()
const formStore = useFormStore()
const { currentForm } = storeToRefs(formStore)

const sectionStore = useSectionStore()
const { sectionList } = storeToRefs(sectionStore)

const questionStore = useQuestionStore()
const { questionList } = storeToRefs(questionStore)

const formId = Number(route.params.id)
const loading = ref(false)

const fetchData = loadingDecorator(formStore.getForm, loading)

watchEffect(async () => {
  formStore.$reset()
  const result = await fetchData(formId)
  if (result.id == 0) {
    navigateTo('/forms')
  }
})

function previewForm() {
  navigateTo(`/forms/${formId}/preview`)
}
</script>

<style lang="scss" scoped>
.edit-wrapper {
  background-color: rgb(240, 240, 240)
}
.edit-content {
  width: 800px;
}
.section-wrapper {
  margin: 1rem 0;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 4px;
}
.label {
  font-weight: 900;
  font-size: 1.8rem;
  line-height: 1.4;
  color: $textColor;
  display: flex;
}
.title {
  font-weight: 900;
  font-size: 1.4rem;
  @include line-clamp(2);

  @apply w-full text-center;
}

.loading-status {
  font-size: 0.8rem;
  margin-left: 20px;
}
</style>