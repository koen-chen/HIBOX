<template>
  <div class="flex w-full mt-10">
    <div class="w-full">
      <div class="input">
        <TextEditor :data="descriptionValue" @change="(data: string) => descriptionValue = data" style="min-height: 9rem" />
      </div>

      <div class="mb-4 mt-8">
        {{ $t('Allow only specific file types') }}
      </div>

      <el-checkbox-group class="w-full my-4" v-model="fileTypes">
        <el-row :gutter="16">
          <el-col :span="6">
            <el-checkbox label="Document" />
          </el-col>
          <el-col :span="6">
            <el-checkbox label="Presentation" />
          </el-col>
          <el-col :span="6">
            <el-checkbox label="Spreadsheet" />
          </el-col>
          <el-col :span="6">
            <el-checkbox label="PDF" />
          </el-col>
          <el-col :span="6">
            <el-checkbox label="Image" />
          </el-col>
          <el-col :span="6">
            <el-checkbox label="Video" />
          </el-col>
          <el-col :span="6">
            <el-checkbox label="Audio" />
          </el-col>
        </el-row>
      </el-checkbox-group>

      <el-row class="w-6/12 mb-4 mt-8" justify="space-between" align="middle">
        <el-col>{{ $t('Maximum number of files') }}</el-col>
        <el-col>
          <el-select v-model="fileCount" :teleported="false">
            <el-option :value="1" label="1"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="w-6/12 my-4 mt-8" justify="space-between" align="middle">
        <el-col>
          {{ $t('Maximum file size') }}
        </el-col>
        <el-col>
          <el-select v-model="fileSize" :teleported="false">
            <el-option :value="30000000" label="30 MB"></el-option>
            <el-option :value="20000000" label="20 MB"></el-option>
            <el-option :value="10000000" label="10 MB"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'update:modelValue': [value: Object]
}>()


const props = withDefaults(defineProps<{
  id: number | null,
  modelValue: {
    description: string,
    fileTypes: string[],
    fileCount: number,
    fileSize: number
  },
}>(), {
  id: null
})

const descriptionValue = ref(props.modelValue.description || '')
const fileTypes = ref(props.modelValue.fileTypes || [])
const fileCount = ref(props.modelValue.fileCount || 1)
const fileSize = ref(props.modelValue.fileSize || 30000000)


watch([descriptionValue, fileTypes, fileCount, fileSize], () => {
  emit('update:modelValue', {
    description: descriptionValue.value,
    fileTypes: fileTypes.value,
    fileCount: fileCount.value,
    fileSize: fileSize.value
  })
})
</script>