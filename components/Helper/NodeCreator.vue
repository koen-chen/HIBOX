<template>
  <el-button-group size="large">
    <el-button @click="addSection" :icon="Files" :loading="sectionLoading">Insert Section</el-button>
    <el-button @click="addQuestion" :icon="CirclePlus" :loading="questionLoading">Add Question</el-button>
  </el-button-group>
</template>

<script setup lang="ts">
import { Files, CirclePlus } from '@element-plus/icons-vue'
import { NodeType, Option } from '~/types';

const props = defineProps<{
  formId: number,
  sectionId?: number,
  afterElement: {
    id: number,
    type: string
  }
}>()

const sectionStore = useSectionStore()
const questionStore = useQuestionStore()
const sectionLoading = ref(false)
const questionLoading = ref(false)

const otherOption = ref(false)
const optionList = ref<Option[]>([
  { label: "Option 1", id: nid() },
  { label: "Option 2", id: nid() }
])

const attributeValue =  {
  options: optionList.value,
  needOther: otherOption.value
}

function addSection() {
  loadingDecorator(sectionStore.addSection, sectionLoading)({
    name: 'Untitled Section',
    form_id: props.formId,
  }, { id: props.afterElement.id, type: props.afterElement.type })
}

function addQuestion() {
  if (props.sectionId) {
   loadingDecorator(questionStore.addQuestion, questionLoading)(
      {
        label: 'Question',
        type: NodeType.Radio,
        required: false,
        attribute: attributeValue,
        form_id: props.formId,
        section_id: props.sectionId
      }, { id: props.afterElement.id, type: props.afterElement.type }
    )
  }
}
</script>