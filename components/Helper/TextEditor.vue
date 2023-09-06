<template>
  <div>
    <ckeditor :editor="BalloonEditor" v-model="editorData" :config="editorConfig" @blur="handleBlur" />
  </div>
</template>

<script setup lang="ts">
import CKEditor from '@ckeditor/ckeditor5-vue';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

const props = defineProps<{ data: string }>()
const emit = defineEmits<{ change: [value: String] }>()

const ckeditor = CKEditor.component
const editorData = ref(props.data)
const editorConfig = {
  toolbar: {
    items: [
      'undo', 'redo',
      '|', 'heading',
      '|', 'bold', 'italic',
      '|', 'link', 'uploadImage', 'insertTable', 'mediaEmbed',
      '|', 'bulletedList', 'numberedList', 'outdent', 'indent'
    ],
    shouldNotGroupWhenFull: true,
  },
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: "https://",
  }
};

const handleBlur = (_: any, editor: { getData: () => string; }) => {
  emit('change', editor.getData())
}
</script>