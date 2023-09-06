<template>
  <div class="w-full">
    <NodeWrapper>
      <el-date-picker
        v-model="value"
        type="date"
        :placeholder="props.placeholder"
        size="large"
        :format="props.format"
        :value-format="props.format"
         @change="(val: typeof props.modelValue) => {
            emit('update:modelValue', val)
         }"
      />
    </NodeWrapper>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'update:modelValue': [value: typeof props.modelValue]
}>()

const props = withDefaults(defineProps<{
  modelValue: string | number | undefined
  format?: string,
  placeholder?: ''
}>(), {
  format: 'YYYY-MM-DD',
})

const value = ref(props.modelValue)
</script>