<template>
  <NodeWrapper :drag="false">
     <el-select placeholder="Default code" class="w-full">
        <el-option v-for="op in lookup.countries" :value="op.country" :label="op.country + '  -  ' + op.region" />
    </el-select>
  </NodeWrapper>
</template>

<script setup lang="ts">
import lookup from 'country-code-lookup'
</script>