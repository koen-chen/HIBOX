<template>
  <div>
    <el-select :model-value="option.associateId || 0" size="large" :teleported="false" :filterable="true"
      :default-first-option="true" @change="(val: string) => props.onChange(val, option)">
      <el-option :key="0" :value="0" :label="$t('Go to Next Section')">
        <span>{{ $t('Go to Next Section') }}</span>
      </el-option>
      <el-option v-for="(item, index) in props.associateList" :key="item.id"
        :label="$t('Go to Section') + ' ' + (index + 1) + ' (' + item.name + ')'" :value="item.id">
        <span>{{ $t('Go to Section') }}</span> {{ index + 1 }} ({{ item.name }})
      </el-option>

      <el-option :key="-1" :value="-1" :label="$t('Submit form')">
        <span>{{ $t('Submit form') }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { Option, SectionType } from '~/types'
const props = defineProps<{
  option: Option
  associateList: SectionType[]
  onChange: Function
}>()
</script>