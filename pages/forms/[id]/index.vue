<template>
  <div class="pb-40 form-wrapper">
    <el-affix :offset="0">
      <Header backUrl="/forms">
        <div class="title">
          {{ currentForm.name }}
        </div>
      </Header>
    </el-affix>

    <div class="w-3/6 mx-auto min-h-screen form-content">
      <FormRecord :record="currentForm" class="section-wrapper" />

      <div class="section-list" ref="sortableRef">
        <div v-for="(sRecord, sIndex) in sectionList" :key="sRecord.id" class="section-wrapper">
          <SectionRecord
            :record="sRecord"
            :order="sIndex + 1"
          >
          </SectionRecord>

          <div v-for="(qRecord, qIndex) in questionList[sRecord.id]" :key="qRecord.id">
            <QuestionRecord
              :record="qRecord"
              :order="qIndex + 1"
            ></QuestionRecord>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const formStore = useFormStore()
const { currentForm } = storeToRefs(formStore)

const sectionStore = useSectionStore()
const { sectionList } = storeToRefs(sectionStore)

const questionStore = useQuestionStore()
const { questionList } = storeToRefs(questionStore)

watchEffect(async () => {
  formStore.$reset()
  const result = await formStore.getForm(Number(route.params.id))
  if (result.id == 0) {
    navigateTo('/forms')
  }
})
</script>

<style lang="scss" scoped>
.form-wrapper {
  background-color: rgb(240, 240, 240)
}

.section-wrapper {
  margin: 1rem 0;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
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