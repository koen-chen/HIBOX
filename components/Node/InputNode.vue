<template>
  <NodeWrapper>
    <el-input
      class="no-el-border"
      v-model="value"
      @input="handleChange"
      placeholder="Please enter a placeholder for this input"
      :type="inputType"
      :rows="props.rows"
      :autosize="props.autosize"
    />
  </NodeWrapper>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const props = withDefaults(defineProps<{
  modelValue: string | number | undefined
  textarea?: boolean
  rows?: number,
  readonly?: boolean,
  autosize?: Object | boolean,
  rules?: { (val: string | number): boolean }[] | null
}>(),{
  textarea: false,
  rows: 1,
  readonly: false,
  autosize: false,
  rules: null
})

const value = ref(props.modelValue)
const valid = ref(true)


const inputType = computed(() => {
  return props.textarea ? 'textarea' : 'text'
})

const handleChange = (val: string | number) => {
  if (props.rules) {
    valid.value = props.rules.some(fn => fn(val))
  }

  if (valid.value) {
    emit('update:modelValue', val)
  } else {
    console.log('not valid')
  }
}
</script>