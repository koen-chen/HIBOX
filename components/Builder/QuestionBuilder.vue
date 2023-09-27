<template>
  <div
    class="w-full question px-4 py-2"
    :class="[`record-${props.record.id}`, { 'is-hovered': (isHovered || isFocused) }]"
    ref="activeRef"
  >
    <div
      class="question-body px-8 py-4"
      @click.stop="focusQuestion"
      ref="focusRef"
    >
      <div class="text-center">
        <div class="qDrag-handle p-2 inline-block" >
          <Icon name="mdi:drag-horizontal" size="22" />
        </div>
      </div>
      <div >
        <div v-if="!isFocused">
          <div class="py-2">{{ props.order }}. {{ props.record.label }}</div>
          <div class="mb-2 p-2 ghost-body">
            <component :is="nodeName" v-model="nodeAttribute" v-bind="nodeConfig" :readonly="true" :id="props.record.id" />
          </div>
        </div>

        <div v-if="isFocused">
          <div class="flex items-center justify-between">
            <div class="flex-grow mr-5">
              <el-input
                size="large"
                v-model="props.record.label"
                @blur="() => updateQuestionInfo({ label: props.record.label })">
              </el-input>
            </div>

            <div>
              <el-select
                class="w-full"
                :placeholder="$t('Choose question type')"
                size="large"
                v-model="type"
                value-key="name"
                @change="chooseType"
                :teleported="false"
              >
                <el-option-group key="basic" :label="$t('Basic')">
                  <el-option v-for="item in BasicTypeList" :key="item.type" :label="item.name" :value="item.type">
                    <div class="flex items-center py-2">
                      <Icon :name="item.icon" />
                      <div class="ml-5">{{ item.name }}</div>
                    </div>
                  </el-option>
                </el-option-group>

                <el-option-group key="modules" :label="$t('Modules')">
                  <el-option v-for="item in ModulesTypeList" :key="item.type" :label="item.name" :value="item.type">
                    <div class="flex items-center  py-2">
                      <Icon :name="item.icon" />
                      <div class="ml-5">{{ item.name }}</div>
                    </div>
                  </el-option>
                </el-option-group>
              </el-select>
            </div>
          </div>

          <div class="ghost-body">
            <component :is="nodeName" v-model="nodeAttribute" v-bind="nodeConfig" :id="props.record.id" />
          </div>

          <el-divider class="mt-10" />

          <div class="flex items-center justify-end">
            <div>
              <span class="mr-2">
                {{ $t('Required') }}
              </span>
              <el-switch
                v-model="required"
                size="large"
                inline-prompt
                :active-icon="Check"
                :inactive-icon="Close"
                @change="() => updateQuestionInfo({ required })"
                />
            </div>

            <div class="flex items-center">
              <el-divider direction="vertical" style="margin: 0 30px; height: 1.9em" />

              <div>
                <Icon
                  class="action-icon"
                  name="mdi:trash-can"
                  @click="handleDelete"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isFocused" class="mt-4">
      <NodeCreator
        :formId="props.record.form_id"
        :afterElement="{
          type: 'Question',
          id: props.record.id,
          sectionId: props.sectionId
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check, Close } from '@element-plus/icons-vue'
import { InputNode, DropdownNode, DateNode, UploadNode, PhoneNode, CountryNode, NodeCreator } from '#components'
import { QuestionType, NodeList, NodeType, QuestionUpdateType } from '~/types';

const props = defineProps<{
  record: QuestionType,
  sectionId: number,
  order: number
}>()

const NodeList: NodeList = {
  [NodeType.Input]: {
    node: InputNode
  },
  [NodeType.Textarea]: {
    node: InputNode,
    config: { textarea: true },
  },
  [NodeType.Radio]: {
    node: DropdownNode,
    config: { needOtherOption: true, optionIcon: 'mdi:radiobox-blank' },
    attribute: {
      options: [
        { label: "Option 1", id: nid() },
        { label: "Option 2", id: nid() }
      ],
      needOther: false
    }
  },
  [NodeType.Checkbox]: {
    node: DropdownNode,
    config: { needOtherOption: true, optionIcon: 'mdi:checkbox-blank-outline' },
    attribute: {
      options: [
        { label: "Option 1", id: nid() },
        { label: "Option 2", id: nid() }
      ],
      needOther: false
    }
  },
  [NodeType.Dropdown]: {
    node: DropdownNode,
    config: { optionIcon: "INDEX" },
    attribute: {
      options: [
        { label: "Option 1", id: nid() },
        { label: "Option 2", id: nid() }
      ],
      needOther: false
    }
  },
  [NodeType.FileUpload]: {
    node: UploadNode
  },
  [NodeType.Date]: {
    node: DateNode
  },
  [NodeType.Phone]: {
    node: PhoneNode
  },
  [NodeType.Country]: {
    node: CountryNode
  },
  [NodeType.Email]: {
    node: InputNode,
    attribute: {
      rules: ['emailChecker']
    }
  },
  [NodeType.DateOfBirth]: {
    node: DateNode,
    attribute: {
      birthday: true,
      rules: ['dateOfBirthChecker']
    }
  }
}

const BasicTypeList = [
  { type: NodeType.Input, name: "Short answer", icon: "mdi:text-short" },
  { type: NodeType.Textarea, name: "Paragraph", icon: "mdi:text" },
  { type: NodeType.Radio, name: "Radio", icon: "mdi:radiobox-marked" },
  { type: NodeType.Checkbox, name: "Checkbox", icon: "mdi:checkbox-marked" },
  { type: NodeType.Dropdown, name: "Dropdown", icon: "mdi:arrow-down-drop-circle" },
  { type: NodeType.FileUpload, name: "File upload", icon: "mdi:cloud-upload" },
  { type: NodeType.Date, name: "Date", icon: "mdi:calendar" }
]

const ModulesTypeList = [
  { type: NodeType.Phone, name: "Phone", icon: "mdi:cellphone" },
  { type: NodeType.Country, name: "Country", icon: "mdi:arrow-down-drop-circle" },
  { type: NodeType.Email, name: "Email", icon: "mdi:email" },
  { type: NodeType.DateOfBirth, name: "Date of Birth", icon: "mdi:calendar" }
]

const questionStore = useQuestionStore()
const { latestQuestionId } = storeToRefs(questionStore)

const isFocused = ref(false)
const activeRef = ref()
const isHovered = useElementHover(activeRef)
const focusRef = ref()

const type = ref(props.record.type || '')
const nodeName = computed(() => NodeList[type.value].node)
const nodeConfig = computed(() => NodeList[type.value].config)
const nodeAttribute = ref(props.record.attribute)
const required = ref(props.record.required)

onClickOutside(activeRef, () => isFocused.value = false)

watchPostEffect(() => {
  isHovered.value = false
  if (latestQuestionId.value == props.record.id) {
    focusRef.value.click()
    focusRef.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
})

watch(nodeAttribute, () => {
  updateQuestionInfo({
    attribute: nodeAttribute.value
  })
})

function focusQuestion() {
  isFocused.value = true
}

function chooseType(type: string) {
  nodeAttribute.value = NodeList[type].attribute || {}
  updateQuestionInfo({ type: type })
}

function handleDelete() {
  questionStore.deleteQuestion(props.record.id, props.sectionId)
}

function updateQuestionInfo(info: QuestionUpdateType) {
  questionStore.updateQuestion(props.record.id, info)
}

</script>

<style lang="scss" scoped>
.question-body {
  border-top: 4px solid transparent;
}
.is-hovered {
  .question-body {
    border-top: 4px solid $primaryColor;
    background-color: $maskColor;
    cursor: pointer;
  }
}

.action-icon {
  margin: 0 15px;
  size: 1.4rem;
  color: #7a8182;
  cursor: pointer;
}
</style>