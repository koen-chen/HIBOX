<template>
  <div class="w-full question">
    <div class="question-info my-4">
      <div class="question-title">
        <span class="text-lg pr-2">{{ props.order }}.</span>
        <span>{{ props.record.label }}</span>
      </div>
    </div>

    <div v-if="props.record.type == NodeType.Title">
      <div class="title">{{ props.record.label }}</div>
    </div>

    <div v-if="props.record.type == NodeType.Input">
      <el-input placeholder="Enter your short answer" size="large"></el-input>
    </div>

    <div v-if="props.record.type == NodeType.Textarea">
      <el-input placeholder="Enter your long answer" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" size="large"></el-input>
    </div>

    <div v-if="props.record.type == NodeType.Checkbox">
      <el-checkbox-group v-model="checkboxValue">
        <div class="flex flex-col items-start">
          <el-checkbox v-for="(op, index) in attribute['options']"
            :key="op['id']"
            :label="op['id']"
            size="large"
            class="my-1 px-4"
          >
            <div v-html="op['label']"></div>
          </el-checkbox>
        </div>
      </el-checkbox-group>
    </div>

    <div v-if="props.record.type == NodeType.Radio">
      <el-radio-group v-model="radioValue">
        <div class="flex flex-col items-start">
          <el-radio v-for="(op, index) in attribute['options']"
            :key="op['id']"
            :label="op['id']"
            size="large"
            class="my-1 px-4"
          >
            <div v-html="op['label']"></div>
          </el-radio>
        </div>
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

    <div v-if="props.record.type == NodeType.FileUpload"></div>

    <div v-if="props.record.type == NodeType.Date"></div>

    <div v-if="props.record.type == NodeType.Phone"></div>

    <div v-if="props.record.type == NodeType.DateOfBirth"></div>

    <div v-if="props.record.type == NodeType.Email"></div>
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