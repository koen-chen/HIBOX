<template>
  <div class="w-full px-2 py-1">
    <div class="w-full mb-2">
      <NodeWrapper v-for="op in optionList" :key="op.id">
        <div class="flex items-center">
          <div v-if="props.optionIcon" class="flex-none  w-4 mr-1">
            <Icon :name="props.optionIcon" color="#7a8182" />
          </div>
          <div class="flex-grow break-words">
            <TextEditor :data="op.label" @change="(data: string) => updateOption(op, data)" />
          </div>

          <div class="flex-none w-14" v-if="optionList.length != 1">
            <el-button link @click="() => removeOption(op)">
              <Icon name="mdi:close" />
            </el-button>
          </div>
        </div>
      </NodeWrapper>

      <NodeWrapper v-if="otherOption">
        <div class="flex items-center">
          <div v-if="props.optionIcon" class="flex-none  w-4 mr-1">
            <Icon :name="props.optionIcon" color="#7a8182" />
          </div>
          <div class="flex-grow break-words">
            <el-input value="Other..." readOnly bordered={false} style="color: #b8c2c2" />
          </div>

          <div class="flex-none w-14">
            <el-button  link @click="removeOtherOption">
              <Icon name="mdi:close" color="#7a8182" />
            </el-button>
          </div>
        </div>
      </NodeWrapper>
    </div>

    <div class="add-option-wrapper">
      <el-button text @click="addOption" style="color: #7a8182">
        {{ $t('Add option') }}
      </el-button>

      <div v-if="!otherOption && needOtherOption">
        <span>{{ $t('or') }}</span>

        <el-button text @click="addOtherOption" style="textDecoration: underline">
          {{ $t("Add Other") }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid'

const emit = defineEmits<{
  'update:modelValue': [value: Object]
}>()

const props = withDefaults(defineProps<{
  modelValue: string | number | undefined
  optionIcon?: string,
  needOtherOption?: boolean
}>(), {
  optionIcon: '',
  needOtherOption: false
})

type Option = {
  label: string,
  id: string
}

const needOtherOption = ref(props.needOtherOption)
const otherOption = ref(false)
const optionList = ref<Option[]>([
  { label: "Option 1", id: nanoid(5) },
  { label: "Option 2", id: nanoid(5) },
  { label: "Option 3", id: nanoid(5) },
])

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
  emit('update:modelValue', optionList.value)
}, { immediate: true })
</script>

<style lang="scss" scoped>
.add-option-wrapper {
  width: 100%;
  margin-top: 2rem;
  margin-left: 2.8rem;
  padding-bottom: 0.8rem;
  border-bottom: solid 1px #dbe3e4;

  @apply flex items-center;
}
</style>