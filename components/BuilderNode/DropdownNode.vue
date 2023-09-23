<template>
  <div class="w-full px-2 py-1">
    <div class="w-full mb-2">
      <template v-for="(op, index) in optionList" :key="op.id">
        <NodeWrapper v-if="!props.readonly">
          <div class="flex items-center">
            <div v-if="props.optionIcon" class="flex-none w-4 mx-1">
              <span v-if="props.optionIcon == 'INDEX'">{{ (index + 1) }}.</span>
              <Icon v-else :name="props.optionIcon" color="#7a8182" />
            </div>
            <div class="flex-grow break-words">
              <TextEditor :data="op.label" @change="(data: string) => updateOption(op, data)" />
            </div>

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

      <template v-if="otherOption">
        <NodeWrapper v-if="!props.readonly">
          <div class="flex items-center">
            <div v-if="props.optionIcon" class="flex-none w-4 mr-4">
              <Icon :name="props.optionIcon" color="#7a8182" />
            </div>
            <div class="flex-grow break-words">
              <div class="p-3">Other...</div>
            </div>

            <div class="flex-none w-14 ml-4">
              <el-button  link @click="removeOtherOption">
                <Icon name="mdi:close" color="#7a8182" />
              </el-button>
            </div>
          </div>
        </NodeWrapper>

         <NodeWrapper v-else :drag="false">
            <div class="flex items-center">
              <div v-if="props.optionIcon" class="flex-none w-4 mr-4">
                <Icon :name="props.optionIcon" color="#7a8182" />
              </div>
              <div class="flex-grow break-words">
                <div class="p-3">Other...</div>
              </div>
            </div>
          </NodeWrapper>
      </template>
    </div>

    <div v-if="!props.readonly" class="add-option-wrapper">
      <el-button text @click="addOption" style="color: #7a8182; textDecoration: underline">
        {{ $t('Add Option') }}
      </el-button>

      <div v-if="!otherOption && props.needOtherOption">
        <span>{{ $t('or') }}</span>

        <el-button text @click="addOtherOption" style="color: #7a8182; textDecoration: underline">
          {{ $t("Add Other") }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sanitize } from "isomorphic-dompurify";
import { nanoid } from 'nanoid'
import { Option } from '~/types'

const emit = defineEmits<{
  'update:modelValue': [value: Object]
}>()

const props = withDefaults(defineProps<{
  id: number | null,
  modelValue: {
    needOther: boolean,
    options: []
  },
  optionIcon?: string,
  needOtherOption?: boolean,
  readonly?: boolean
}>(), {
  id: null,
  optionIcon: '',
  needOtherOption: false,
  readonly: false
})

const otherOption = ref<boolean>(props.modelValue.needOther)
const optionList = ref<Option[]>(props.modelValue.options)

const addOption = () => {
  const newValue = { label: "Additional option", id: nanoid(5) }
  optionList.value = [...optionList.value, newValue]
}

const updateOption = (item: Option, label: string) => {
  const newValue = { id: item.id, label: label };
  optionList.value = optionList.value.map((v) => (v.id === item.id ? { ...v, ...newValue } : v))
}

const removeOption = (item: Option) => {
  optionList.value = optionList.value.filter((v) => v && v.id !== item.id)
}

const addOtherOption = () => {
  otherOption.value = true
};

const removeOtherOption = () => {
  otherOption.value = false
}

watch(optionList, () => {
  emit('update:modelValue', {
    options: optionList.value,
    needOther: otherOption.value
  })
})
</script>

<style lang="scss" scoped>
.add-option-wrapper {
  margin-top: 2rem;
  padding-bottom: 0.8rem;

  @apply flex items-center;
}
</style>