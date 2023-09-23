<template>
  <div class="w-full">
    <NodeWrapper>
      <el-select v-modal="value" class="w-full">
        <el-option v-for="op in props.options" :key="op.id" :value="op.id" :label="op.name" />
      </el-select>
    </NodeWrapper>
  </div>
</template>

<script setup lang="ts">
type Option = {
  id: string,
  name: string
}

const props = defineProps<{
  options: Option[]
}>()

const value = ref(props.options[0].id)
</script>