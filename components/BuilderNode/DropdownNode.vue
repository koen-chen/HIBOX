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
                <TextEditor :data="op.label" @change="(data: string) => updateOption(op, data)" />
              </div>

              <div v-if="props.associate">
                <el-select
                  :model-value="op.associateId || 0"
                  size="large"
                  :teleported="false"
                  :filterable="true"
                  :default-first-option="true"
                  @change="(val: string) => handleAssociateChange(val, op)"
                >
                  <el-option
                    :key="0"
                    :value="0"
                    :label="$t('Go to Next Section')">
                    <span>{{ $t('Go to Next Section') }}</span>
                  </el-option>
                  <el-option
                    v-for="(item, index) in props.associateList"
                    :key="item.id"
                    :label="$t('Go to Section') + ' ' + (index + 1) + ' ('+ item.name + ')'"
                    :value="item.id"
                  >
                    <span>{{ $t('Go to Section') }}</span> {{ index + 1 }} ({{ item.name }})
                  </el-option>

                  <el-option
                    :key="-1"
                    :value="-1"
                    :label="$t('Submit form')">
                    <span>{{ $t('Submit form') }}</span>
                  </el-option>
                </el-select>
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
      </VueDraggable>

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
import { VueDraggable } from 'vue-draggable-plus'
import { sanitize } from "isomorphic-dompurify";
import { nanoid } from 'nanoid'
import { Option, SectionType } from '~/types'

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

const otherOption = ref<boolean>(props.modelValue.needOther)
const optionList = ref<Option[]>(props.modelValue.options)

watch(optionList, () => {
  emit('update:modelValue', {
    options: optionList.value,
    needOther: otherOption.value
  })
})

function addOption() {
  const newValue = { label: "Additional option", id: nanoid(5) }
  optionList.value = [...optionList.value, newValue]
}

function updateOption(item: Option, label: string) {
  const newValue = { id: item.id, label: label };
  optionList.value = optionList.value.map((v) => (v.id === item.id ? { ...v, ...newValue } : v))
}

function removeOption(item: Option) {
  optionList.value = optionList.value.filter((v) => v && v.id !== item.id)
}

function addOtherOption() {
  otherOption.value = true
};

function removeOtherOption() {
  otherOption.value = false
}

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