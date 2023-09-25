<template>
  <div class="pb-40 preview-wrapper">
    <el-affix :offset="0">
      <Header :backUrl="`/forms/${currentForm.id}`">

      </Header>
    </el-affix>

    <div class="mx-auto preview-content">
      <div class="form-info">
        <div class="form-title">{{ currentForm.name }}</div>
        <div class="form-desc">{{ currentForm.description }}</div>
      </div>

      <template v-for="(sRecord, sIndex) in sectionList" :key="sRecord.id" >
        <div class="section-box" v-if="sIndex == activeSection">
          <div class="section-info">
            <div class="section-title">{{ sRecord.name }}</div>
            <div class="section-desc">{{ sRecord.description }}</div>
          </div>

          <div v-for="(qRecord, qIndex) in questionList[sRecord.id]" :key="qRecord.id" >
            <QuestionPresenter :record="qRecord" :order="qIndex + 1" class="pb-10" />
          </div>

          <div class="mt-20">
            <el-button v-if="activeSection != 0" size="large" @click="handleSectionBack">Back</el-button>
            <el-button v-if="activeSection != (sectionList.length - 1)" size="large" type="primary" @click="handleSectionNext">Next</el-button>
            <el-button v-if="activeSection == (sectionList.length - 1)" size="large" type="primary" @click="handleFormSubmit">Submit</el-button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NodeType } from '~/types';

definePageMeta({
  layout: "preview",
});

const route = useRoute()
const formStore = useFormStore()
const { currentForm } = storeToRefs(formStore)

const sectionStore= useSectionStore()
const { sectionList } = storeToRefs(sectionStore)

const questionStore = useQuestionStore()
const { questionList } = storeToRefs(questionStore)

const formId = Number(route.params.id)

const activeSection = ref(0)

watchEffect(async () => {
  const result = await formStore.getForm(formId)
  if (result.id == 0) {
    navigateTo('/forms')
  }
})

function handleSectionNext() {
  activeSection.value = activeSection.value + 1
}

function handleSectionBack() {
  activeSection.value = activeSection.value - 1
}

function handleFormSubmit() {

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
}

</style>