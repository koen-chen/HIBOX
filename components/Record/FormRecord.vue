<template>
   <div class="flex py-10">
      <div class="w-full">
        <div class="mb-1">{{ $t('Form Name').toUpperCase() }}</div>
        <el-input v-model="props.record.name" size="large" maxlength="50" />

        <div class="mt-8 mb-1">{{ $t('Form Description').toUpperCase() }}</div>
        <el-input v-model="props.record.description" type="textarea" rows="4" />
      </div>
    </div>
</template>

<script setup lang="ts">
import { FormType } from '~/types';

const props = defineProps<{
 record: FormType
}>()

const formStore = useFormStore()

watchDebounced(() => props.record.name, (newVal, oldVal) => {
  if (newVal == '') {
    props.record.name = 'Untitled Form'
  }

  if (oldVal !== '') {
    updateBasicInfo('name')
  }
}, { debounce: 500 })

watchDebounced(() => props.record.description, () => {
  updateBasicInfo('description')
}, { debounce: 500 })

const updateBasicInfo = async (key: 'name' | 'description') => {
  await formStore.updateForm(props.record.id, {
    [key]: key == 'name' ? props.record.name : props.record.description
  })
}
</script>
