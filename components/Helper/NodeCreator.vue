<template>
  <el-button-group>
    <el-button type="primary" size="large" @click="addSection">Insert Section</el-button>
    <el-button type="primary" size="large" @click="addQuestion">Add Question</el-button>
  </el-button-group>
</template>

<script setup lang="ts">
import { NodeType, Option } from '~/types';
import { nanoid } from 'nanoid'

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

const optionList = ref<Option[]>([
  { label: "Option 1", id: nanoid(5) },
  { label: "Option 2", id: nanoid(5) }
])

function addSection() {
  sectionStore.addSection({
    name: 'Untitled Section',
    form_id: props.formId,
  }, { id: props.afterElement.id, type: props.afterElement.type })
}

function addQuestion() {
  if (props.sectionId) {
    questionStore.addQuestion({
      label: 'Question',
      type: NodeType.Radio,
      required: false,
      attribute: JSON.stringify(optionList.value),
      form_id: props.formId,
      section_id: props.sectionId
    }, { id: props.afterElement.id, type: props.afterElement.type })
  }
}
</script>