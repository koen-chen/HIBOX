<template>
  <div class="w-full question">
    <div class="question-info">
      <div class="question-title">{{ props.order + '. '+ props.record.label }}</div>
    </div>

    <div v-if="props.record.type == NodeType.Title"></div>

    <div v-if="props.record.type == NodeType.Input">
      <el-input :placeholder="attribute['placeholder']"></el-input>
    </div>

    <div v-if="props.record.type == NodeType.Textarea"></div>

    <div v-if="props.record.type == NodeType.Checkbox">
      <el-checkbox-group v-model="checkboxValue">
        <el-checkbox v-for="(op, index) in attribute['options']"
          :key="op['id']"
          :label="op['id']"
          size="large"
        >
          <div v-html="op['label']"></div>
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <div v-if="props.record.type == NodeType.Radio">

      <el-radio-group v-model="radioValue">
        <el-radio v-for="(op, index) in attribute['options']"
          :key="op['id']"
          :label="op['id']"
          size="large"
        >
          <div v-html="op['label']"></div>
        </el-radio>
      </el-radio-group>
    </div>

    <div v-if="props.record.type == NodeType.Dropdown">
      <el-select v-model="selectValue" size="large">
        <el-option
          v-for="(op, index) in attribute['options']"
          :key="index"
          :label="op['label']"
        />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QuestionType, NodeType } from '~/types';

const props = defineProps<{
  record: QuestionType,
  order: number
}>()

const attribute = props.record.attribute

const checkboxValue = ref([])
const radioValue = ref()
const selectValue = ref()
</script>