<template>
  <NodeWrapper>
    <el-input v-model="numberValue" placeholder="Please input placeholder">
      <template #prepend>
        <el-select v-model="regionCodeValue" placeholder="Default code" style="width: 150px; background: #fff">
          <el-option v-for="op in regionCodeList" :value="'+' + op" :label="'+' + op" />
        </el-select>
      </template>
    </el-input>
  </NodeWrapper>
</template>

<script setup lang="ts">
import { getSupportedCallingCodes } from 'awesome-phonenumber'

const regionCodeList = getSupportedCallingCodes()
const regionCodeValue = ref('')

const numberValue = ref('')
</script>