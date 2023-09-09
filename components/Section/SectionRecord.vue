<template>
  <div
    :class="['section-node', { 'node-focused': props.focused }]"
  >
    <div class="w-full" :class="[`node-${props.sectionData.id}`]">
      <div class="section-head">
        <div class="grow">
          <slot name="drag" />
        </div>

        <div>
          <el-tooltip :content="$t('Collapse Section')" placement="top" effect="light">
            <span @click.stop="() => hanldeCollapse()">
              <Icon name="mdi:unfold-less-horizontal" class="cursor-pointer" />
            </span>
          </el-tooltip>
          <el-tooltip :content="$t('Delete Section')" placement="top" effect="light">
            <span @click.stop="() => hanldeDelete()">
              <Icon name="mdi:trash-can-outline" class="ml-3 cursor-pointer" />
            </span>
          </el-tooltip>
        </div>
      </div>

      <div v-show="!collapse" class="section-body" >
        <div class="mb-4 p-4 no-el-border">
          <el-input v-model="formModal.name" @blur="() => updateBasicInfo('name')" class="border-input" />
          <el-input v-model="formModal.description" @blur="() => updateBasicInfo('description')"
            placeholder="Description (optional)" class="border-input" type="textarea" autosize />
        </div>

        <QuestionList
          v-if="filterQuestionList"
          :sectionData="props.sectionData"
          :questionList="filterQuestionList"
        />
      </div>
    </div>

    <div class="h-full w-24 min-h-full">
      <el-affix :target="`.node-${props.sectionData.id}`" :offset="100" :z-index="20">
        <div class="question-actions" v-if="props.focused">
          <div class="p-2">
            <el-tooltip
              content="Add Question"
              placement="right"
            >
              <el-button size="small" :icon="Plus" circle @click="() => addQuestion(props.sectionData.id)" />
            </el-tooltip>
          </div>
          <div class="p-2">
            <el-tooltip
              content="Add Question"
              placement="right"
            >
              <el-button size="small" :icon="Plus" circle @click="() => addQuestion(props.sectionData.id)" />
            </el-tooltip>
          </div>
        </div>
      </el-affix>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SectionType } from '~/types'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps<{
  sectionData: SectionType,
  formId: number,
  focused: boolean
}>()

const sectionStore = useSectionStore()
const questionStore = useQuestionStore()
const { questionList } = storeToRefs(questionStore)

const collapse = ref(false)

const filterQuestionList = computed(() => questionList.value?.filter(item => item.section_id == props.sectionData.id))

const formModal = ref({
  name: props.sectionData.name,
  description: props.sectionData.description
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
  sectionStore.updateSection(props.sectionData.id, {
    [key]: formModal.value[key]
  })
}

const hanldeCollapse = () => {
  collapse.value = !collapse.value
}

const hanldeDelete = () => {
  sectionStore.deleteSection(props.sectionData.id)
}
</script>

<style lang="scss" scoped>
.section-node {
  @apply w-full flex pb-10;

  .border-input {
    border-bottom: 1px solid $borderColor;

    @apply mb-3;
  }

  &.node-focused {
    .section-head,
    .section-body {
      border-color: $primaryActiveColor;
    }
  }
}

.section-head {
  background-color: $primaryHoverColor;
  border: 1px solid $primaryHoverColor;

  @apply flex items-center justify-between p-4 relative z-30 grow;
}

.section-body {
  border: 1px solid $primaryHoverColor;
  border-top: 0;

  @apply p-4;
}

.section-fragement {
  background-color: $maskColor;
  border: 1px solid $primaryHoverColor;

  @apply w-full p-4;
}

.question-actions {
  background-color: #fff;
  border: 1px solid $primaryHoverColor;

  @apply flex flex-col items-center justify-between ml-4 p-2;
}
</style>