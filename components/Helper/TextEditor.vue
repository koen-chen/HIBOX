<template>
  <QuillEditor content-type="html" theme="bubble" v-model:content="editorData" @blur="handleBlur"/>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

const props = defineProps<{ data: string }>()
const emit = defineEmits<{ change: [value: string] }>()
const editorData = ref(props.data)

function handleBlur() {
 emit('change', editorData.value)
}
</script>

<style lang="scss">
.ql-editor {
  padding: 0.75rem !important;
}
</style>