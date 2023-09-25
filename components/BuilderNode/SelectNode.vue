<template>
  <NodeWrapper  :drag="false">
    <el-select class="w-full">
      <el-option v-for="op in props.options" :key="op.id" :value="op.id" :label="op.name" />
    </el-select>
  </NodeWrapper>
</template>

<script setup lang="ts">
type Option = {
  id: string,
  name: string
}

const props = defineProps<{
  options: Option[]
}>()
</script>