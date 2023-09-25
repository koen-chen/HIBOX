<template>
  <div class="w-full question">
    <div class="question-info my-4">
      <div class="question-title">
        <span class="text-lg pr-2">{{ props.order }}.</span>
        <span>{{ props.record.label }}</span>
      </div>
    </div>

    <div v-if="props.record.type == NodeType.Input">
      <el-input v-model="inputValue" placeholder="Enter your short answer" size="large"></el-input>
    </div>

    <div v-if="props.record.type == NodeType.Textarea">
      <el-input v-model="textareaValue" placeholder="Enter your long answer" type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }" size="large"></el-input>
    </div>

    <div v-if="props.record.type == NodeType.Checkbox">
      <el-checkbox-group v-model="checkboxValue">
        <div class="flex flex-col items-start">
          <el-checkbox v-for="(op, index) in attribute['options']" :key="op['id']" :label="op['id']" size="large"
            class="my-1 px-4">
            <div v-html="op['label']"></div>
          </el-checkbox>
        </div>
      </el-checkbox-group>
    </div>

    <div v-if="props.record.type == NodeType.Radio">
      <el-radio-group v-model="radioValue">
        <div class="flex flex-col items-start">
          <el-radio v-for="(op, index) in attribute['options']" :key="op['id']" :label="op['id']" size="large"
            class="my-1 px-4">
            <div v-html="op['label']"></div>
          </el-radio>
        </div>
      </el-radio-group>
    </div>

    <div v-if="props.record.type == NodeType.Dropdown">
      <el-select v-model="selectValue" size="large">
        <el-option v-for="(op, index) in attribute['options']" :key="index" :label="op['label']" />
      </el-select>
    </div>

    <div v-if="props.record.type == NodeType.FileUpload">
      {{ props.record.attribute }}
      <el-upload
        v-model:file-list="fileListValue"
        :accept="acceptFileType"
        :before-upload="beforeUpload"
      >
        <el-button type="primary">Click to upload</el-button>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
    </div>

    <div v-if="props.record.type == NodeType.Date">
      <el-date-picker v-model="dateValue" type="date" placeholder="Pick a day" :size="size" />
    </div>

    <div v-if="props.record.type == NodeType.Phone">
      <el-input placeholder="Please input phone number">
        <template #prepend>
          <el-select v-model="phoneValue" placeholder="Default code" style="width: 150px; background: #fff">
            <el-option v-for="op in regionCodeList" :value="'+' + op" :label="'+' + op" />
          </el-select>
        </template>
      </el-input>
    </div>

    <div v-if="props.record.type == NodeType.DateOfBirth">
      <el-date-picker v-model="dateValue" type="date" placeholder="Pick a day" :size="size" />
    </div>

    <div v-if="props.record.type == NodeType.Email">
      <el-input placeholder="Enter your answer" size="large"></el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QuestionType, NodeType } from '~/types';
import { getSupportedCallingCodes } from 'awesome-phonenumber'
import { UploadRawFile } from 'element-plus';

const props = defineProps<{
  record: QuestionType,
  order: number
}>()

const attribute = props.record.attribute

const inputValue = ref('')
const textareaValue = ref('')
const checkboxValue = ref([])
const radioValue = ref()
const selectValue = ref()
const dateValue = ref()

const supportFileType: { [key: string]: string } = {
  Document: ".txt, .doc, .docx, .rtf",
  Presentation: ".ppt, .pptx, .key, .pps, .odp",
  Spreadsheet: ".xls, .xlsx, .xlsm, .numbers",
  PDF: ".pdf,.wpd",
  Image: ".jpg, .png, .gif, .heic, .jpeg, .tiff, .tif",
  Video: ".mp4, .wmv, .mpeg, .mov, .mpg",
  Audio: ".m4a, .mid, .mp3, .wav, .wma",
};

const acceptFileType = (attribute['fileType'] as string[]).length > 0
  ? (attribute['fileType'] as string[])
    .map((item: string) => {
      return supportFileType[item];
    })
    .join(",")
  : "*";

const regionCodeList = getSupportedCallingCodes()
const phoneValue = ref('')
const fileListValue = ref()

function beforeUpload(file: UploadRawFile) {
    if (attribute.fileSize && file.size > (attribute['fileSize'] as number)) {
      return false;
    }


    return true;
  };
</script>