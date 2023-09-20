<template>
   <div class="flex py-10">
      <div class="w-full">
        <div class="mb-1">{{ $t('Form Name').toUpperCase() }}</div>
        <el-input v-model="props.name" size="large" maxlength="50" />

        <div class="mt-8 mb-1">{{ $t('Form Description').toUpperCase() }}</div>
        <el-input v-model="props.description" type="textarea" rows="4" />
      </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: number,
  name: string,
  description: string
}>()

const formStore = useFormStore()

watchDebounced(() => props.name, (newVal, oldVal) => {
  if (newVal == '') {
    name.value = 'Untitled Form'
  }

  if (oldVal !== '') {
    updateBasicInfo('name')
  }
}, { debounce: 500 })

watchDebounced(() => props.description, () => {
  updateBasicInfo('description')
}, { debounce: 500 })

const updateBasicInfo = async (key: 'name' | 'description') => {
  await formStore.updateForm(props.id, {
    [key]: key == 'name' ? props.name : props.description
  })
}
</script>
