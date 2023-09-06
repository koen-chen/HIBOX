<template>
  <div class="section-node">
    <div class="section-content">
      <div class="w-full no-el-border">
        <el-input v-model="sectionItem.name" class="border-input" />
        <el-input v-model="sectionItem.description" placeholder="Description (optional)" class="border-input" type="textarea"
          autosize />
      </div>

      <div class="w-full">
        <QuestionList
          v-if="filterQuestionList"
          :formId="props.formId"
          :sectionItem="sectionItem"
          :questionList="filterQuestionList"
        />
      </div>
    </div>

    <div v-if="choosedSectionId == sectionItem.id">
      <el-button @click="() => addQuestion(sectionItem.id)">add question</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SectionType } from '~/types'

interface Props {
  sectionItem: SectionType,
  formId: number,
  choosedSectionId?: number
}

const props = defineProps<Props>()
const questionStore = useQuestionStore()
const { questionList } = storeToRefs(questionStore)

const filterQuestionList = computed(() => {
  return questionList.value?.filter(item => item.section_id == props.sectionItem.id)
})

const addLoading = ref(false)
const addQuestion = async (sectionId: number) => {
  addLoading.value = true

  await questionStore.addQuestion({
    label: '',
    type: '',
    section_id: sectionId,
    form_id: props.formId
  })

  nextTick(() => {
    addLoading.value = false
  })
}
</script>

<style lang="scss" scoped>
.section-node {
  &.focus {
    .section-head,
    .section-content {
      border-color: $primaryActiveColor;
    }
  }

  @apply pb-8
}

.section-content {
  width: 100%;
  border: 1px solid $primaryHoverColor;
  border-top: none;
  background-color: $maskColor;
  border-radius: 0 0 6px 6px;

  @apply p-4 flex flex-col items-start justify-center;

  .border-input {
    border-bottom: 1px solid $borderColor;

    @apply mb-3;
  }
}
</style>