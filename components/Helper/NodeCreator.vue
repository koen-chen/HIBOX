<template>
  <el-button-group size="large">
    <el-button @click="addSection" :icon="Files" :loading="sectionLoading">{{ $t('Insert Section') }}</el-button>
    <el-button @click="addQuestion" :icon="CirclePlus" :loading="questionLoading">{{ $t('Add Question') }}</el-button>
  </el-button-group>
</template>

<script setup lang="ts">
import { Files, CirclePlus } from '@element-plus/icons-vue'
import { NodeType, Option } from '~/types';

const props = defineProps<{
  formId: string,
  afterElement: {
    type: string,
    id: string,
    sectionId?: string,
  }
}>()

const sectionStore = useSectionStore()
const questionStore = useQuestionStore()
const sectionLoading = ref(false)
const questionLoading = ref(false)
const { t } = useI18n()

const optionList = ref<Option[]>([
  { id: nid(), type: 'normal', label: t("Option 1") },
  { id: nid(), type: 'normal', label: t("Option 2") }
])

const attributeValue =  {
  options: optionList.value,
}

function addSection() {
  loadingDecorator(sectionStore.addSection, sectionLoading)({
    id: nid(),
    name: t('Untitled Section'),
    form_id: props.formId,
    question_order: []
  }, props.afterElement)
}

function addQuestion() {
  loadingDecorator(questionStore.addQuestion, questionLoading)({
    id: nid(),
    label: t('Question'),
    type: NodeType.Radio,
    required: false,
    attribute: attributeValue,
    form_id: props.formId,
  }, props.afterElement)
}
</script>