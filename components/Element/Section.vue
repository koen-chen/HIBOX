<template>
  <div class="section-node">
    <div class="section-fragement  no-el-border mb-4">
      <el-input v-model="formModal.name" @blur="() => updateBasicInfo('name')" class="border-input" />
      <el-input v-model="formModal.description" @blur="() => updateBasicInfo('description')"
        placeholder="Description (optional)" class="border-input" type="textarea" autosize />
    </div>


    <QuestionList v-if="filterQuestionList" :formId="props.formId" :sectionItem="sectionItem"
      :questionList="filterQuestionList" />


    <div class="section-fragement" v-if="choosedSectionId == sectionItem.id">
      <el-button @click="() => addQuestion(sectionItem.id)" :icon="Plus" :loading="addLoading">
        {{ $t('Add Question') }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SectionType } from '~/types'
import { Plus } from '@element-plus/icons-vue'

interface Props {
  sectionItem: SectionType,
  formId: number,
  choosedSectionId?: number
}

const props = defineProps<Props>()
const sectionStore = useSectionStore()
const questionStore = useQuestionStore()
const { questionList } = storeToRefs(questionStore)

const filterQuestionList = computed(() => {
  return questionList.value?.filter(item => item.section_id == props.sectionItem.id)
})

const formModal = ref({
  name: props.sectionItem.name,
  description: props.sectionItem.description
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

const updateBasicInfo = (key: 'name' | 'description') => {
  sectionStore.updateSection(props.sectionItem.id, {
    [key]: formModal.value[key]
  })
}
</script>

<style lang="scss" scoped>
.section-node {
  width: 100%;
  border: 1px solid $primaryHoverColor;
  border-top: none;
  border-radius: 0 0 6px 6px;

  &.focus {

    .section-head,
    .section-content {
      border-color: $primaryActiveColor;
    }
  }

  @apply flex flex-col items-start justify-center;

  .border-input {
    border-bottom: 1px solid $borderColor;

    @apply mb-3;
  }
}

.section-fragement {
  background-color: $maskColor;
  border-bottom: 1px solid $primaryHoverColor;
  border-top: 1px solid $primaryHoverColor;

  @apply w-full p-4;
}
</style>