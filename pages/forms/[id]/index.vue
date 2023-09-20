<template>
  <div class="pb-40">
    <el-affix :offset="0">
      <Header backUrl="/forms">
        <div class="title">
          {{ currentForm.name }}
        </div>
      </Header>
    </el-affix>

    <div class="w-3/6 mx-auto min-h-screen">
      <FormRecord :record="currentForm" />

      <div class="section-list" ref="sortableRef">
        <div v-for="(sRecord, sIndex) in sectionList" :key="sRecord.id">
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
  await formStore.getForm(Number(route.params.id))
})
</script>

<style lang="scss" scoped>
.label {
  font-family: 'Radikal-Bold';
  font-weight: 900;
  font-size: 1.8rem;
  line-height: 1.4;
  color: $textColor;
  display: flex;
}

.title {
  font-family: 'Radikal-Bold';
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