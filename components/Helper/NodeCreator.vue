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
  formId: number,
  afterElement: {
    type: string,
    id: number,
    sectionId?: number,
  }
}>()

const sectionStore = useSectionStore()
const questionStore = useQuestionStore()
const sectionLoading = ref(false)
const questionLoading = ref(false)
const { t } = useI18n()

const otherOption = ref(false)
const optionList = ref<Option[]>([
  { label: t("Option 1"), id: nid() },
  { label: t("Option 2"), id: nid() }
])

const attributeValue =  {
  options: optionList.value,
  needOther: otherOption.value
}

function addSection() {
  loadingDecorator(sectionStore.addSection, sectionLoading)({
    name: t('Untitled Section'),
    form_id: props.formId,
  }, props.afterElement)
}

function addQuestion() {
  loadingDecorator(questionStore.addQuestion, questionLoading)({
    label: t('Question'),
    type: NodeType.Radio,
    required: false,
    attribute: attributeValue,
    form_id: props.formId,
  }, props.afterElement)
}
</script>