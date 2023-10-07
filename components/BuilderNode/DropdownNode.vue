<template>
  <div class="w-full px-2 py-1">
    <div class="w-full mb-2">
      <VueDraggable
        :animation="150"
        ghostClass="ghost-option"
        handle=".drag-handle"
        v-model="optionList"
      >
        <template v-for="(op, index) in optionList" :key="op.id">
          <NodeWrapper v-if="!props.readonly">
            <div class="flex items-center">
              <div v-if="props.optionIcon" class="flex-none w-4 mx-1">
                <span v-if="props.optionIcon == 'INDEX'">{{ (index + 1) }}.</span>
                <Icon v-else :name="props.optionIcon" color="#7a8182" />
              </div>

              <div class="flex-grow break-words">
                <TextEditor v-if="op.type =='normal'" :data="op.label" @change="(data: string) => updateOption(op, data)" />
                <div v-else class="p-3">{{ op.label }}</div>
              </div>

              <AssociateNode v-if="props.associate" :option="op" :associateList="props.associateList" :onChange="handleAssociateChange" />

              <div class="flex-none w-14 ml-4" v-if="(optionList.length != 1)">
                <el-button link @click="() => removeOption(op)">
                  <Icon name="mdi:close" />
                </el-button>
              </div>
            </div>
          </NodeWrapper>

          <NodeWrapper v-else class="node-wrapper" :drag="false">
            <div class="flex items-center">
              <div v-if="props.optionIcon" class="flex-none w-4 mx-1">
                <span v-if="props.optionIcon == 'INDEX'">{{ (index + 1) }}.</span>
                <Icon v-else :name="props.optionIcon" color="#7a8182" />
              </div>
              <div class="flex-grow break-words">
                <div class="p-3" v-html="sanitize(op.label)" />
              </div>
            </div>
          </NodeWrapper>
        </template>
      </VueDraggable>
    </div>

    <div v-if="!props.readonly" class="add-option-wrapper">
      <el-button text @click="addOption" style="color: #7a8182; textDecoration: underline">
        {{ $t('Add Option') }}
      </el-button>

      <div v-if="!hasOtherOption && props.needOtherOption">
        <span>{{ $t('or') }}</span>

        <el-button text @click="addOtherOption" style="color: #7a8182; textDecoration: underline">
          {{ $t("Add Other") }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus'
import { sanitize } from "isomorphic-dompurify";
import { Option, SectionType } from '~/types'

const emit = defineEmits<{
  'update:modelValue': [value: Object]
}>()

const props = withDefaults(defineProps<{
  id: string | null,
  modelValue: {
    options: Option[]
  },
  optionIcon?: string,
  needOtherOption?: boolean,
  readonly?: boolean,
  associate?: boolean
  associateList?: SectionType[]
}>(), {
  id: null,
  optionIcon: '',
  needOtherOption: false,
  readonly: false,
  associate: false
})

const optionList = ref<Option[]>(props.modelValue.options)

const hasOtherOption = computed(() => {
  return optionList.value.some(item => item.type == 'other')
})

watch(optionList, () => {
  emit('update:modelValue', {
    options: optionList.value
  })
}, { deep: true })

function addOption() {
  const newValue: Option = { id: nid(), type: 'normal', label: "Additional option" }
  if (hasOtherOption.value) {
    optionList.value.splice(optionList.value.length - 1, 0, newValue)
  } else {
    optionList.value.push(newValue)
  }
}

function updateOption(item: Option, label: string) {
  const newValue = { id: item.id, label: label };
  optionList.value = optionList.value.map((v) => (v.id === item.id ? { ...v, ...newValue } : v))
}

function removeOption(item: Option) {
  optionList.value = optionList.value.filter((v) => v && v.id !== item.id)
}

function addOtherOption() {
  const newValue: Option = { id: nid(), type: 'other', label: "Other..." }
  optionList.value = [...optionList.value, newValue]
};

function handleAssociateChange(val: string, item: Option) {
  const newValue = { associateId: val };
  optionList.value = optionList.value.map((v) => (v.id === item.id ? reactive({ ...v, ...newValue }) : v))
}
</script>

<style lang="scss" scoped>
.add-option-wrapper {
  margin-top: 2rem;
  padding-bottom: 0.8rem;

  @apply flex items-center;
}
.ghost-option {
  opacity: 0.5;
  background: $primaryHoverColor;
}
</style>