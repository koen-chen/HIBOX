<template>
  <div class="w-full question">
    <div v-if="props.record.type == NodeType.Input">
      <el-input v-model="props.record.value" size="large"></el-input>
    </div>

    <div v-if="props.record.type == NodeType.Textarea">
      <el-input v-model="props.record.value" type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }" size="large"></el-input>
    </div>

    <div v-if="props.record.type == NodeType.Checkbox">
      <el-checkbox-group v-model="props.record.value">
        <div class="flex flex-col items-start">
          <el-checkbox
            v-for="op in attribute['options']"
            :key="op['id']"
            :label="op['id']"
            size="large"
            class="my-1 px-4"
            @change="checkboxChange"
          >
            <div v-html="op['label']"></div>
          </el-checkbox>
        </div>
      </el-checkbox-group>
    </div>

    <div v-if="props.record.type == NodeType.Radio">
      <el-radio-group v-model="props.record.value">
        <div class="flex flex-col items-start">
          <el-radio v-for="(op, index) in attribute['options']"
            :key="op['id']"
            :label="op['id']"
            :value="op"
            size="large"
            class="my-1 px-4"
          >
            <div v-html="op['label']"></div>
          </el-radio>
        </div>
      </el-radio-group>
    </div>

    <div v-if="props.record.type == NodeType.Dropdown">
      <el-select v-model="props.record.value" size="large" :style="{ width: '100%' }">
        <el-option v-for="(op, index) in attribute['options']" :key="index" :label="op['label']" :value="op['id']" />
      </el-select>
    </div>

    <div v-if="props.record.type == NodeType.FileUpload">
      <el-upload
        v-model:file-list="props.record.value"
        :accept="acceptFileType"
        :before-upload="beforeUpload"
        drag
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip ">
            <div class="mb-2">
              <span class="text-black">{{ $t('Supported formats') }}: </span>
              {{ acceptFileType }}
            </div>

            <div>
              <span class="text-black">{{ $t('Maximum file size') }} :</span>
              {{ attribute['fileSize'] }}
            </div>
          </div>
        </template>
      </el-upload>
    </div>

    <div v-if="props.record.type == NodeType.Date">
      <el-date-picker v-model="props.record.value" type="date" placeholder="Pick a day" size="large" :style="{ width: '100%' }" />
    </div>

    <div v-if="props.record.type == NodeType.Phone">
      <el-input v-model="props.record.value"  placeholder="Please input phone number">
        <template #prepend>
          <el-select v-model="phoneValue" placeholder="Default code" style="width: 150px; background: #fff">
            <el-option v-for="op in regionCodeList" :value="'+' + op" :label="'+' + op" />
          </el-select>
        </template>
      </el-input>
    </div>

    <div v-if="props.record.type == NodeType.DateOfBirth">
      <el-date-picker v-model="props.record.value"  type="date" placeholder="Pick a day" size="large" :style="{ width: '100%' }" />
    </div>

    <div v-if="props.record.type == NodeType.Email">
      <el-input v-model="props.record.value" placeholder="Enter your answer" size="large"></el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QuestionType, NodeType, Option } from '~/types'
import { getSupportedCallingCodes } from 'awesome-phonenumber'
import { UploadRawFile } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

const props = defineProps<{
  record: QuestionType,
  order: number
}>()

const attribute = props.record.attribute

const supportFileType: { [key: string]: string } = {
  Document: ".txt, .doc, .docx, .rtf",
  Presentation: ".ppt, .pptx, .key, .pps, .odp",
  Spreadsheet: ".xls, .xlsx, .xlsm, .numbers",
  PDF: ".pdf,.wpd",
  Image: ".jpg, .png, .gif, .heic, .jpeg, .tiff, .tif",
  Video: ".mp4, .wmv, .mpeg, .mov, .mpg",
  Audio: ".m4a, .mid, .mp3, .wav, .wma",
}

let acceptFileType = '*'
if ( attribute['fileTypes'] && (attribute['fileTypes'] as string[]).length > 0) {
  acceptFileType = (attribute['fileTypes'] as string[]).map((item: string) => {
      return supportFileType[item];
  }).join(",")
}

const regionCodeList = getSupportedCallingCodes()

function beforeUpload(file: UploadRawFile) {
  if (attribute.fileSize && file.size > (attribute['fileSize'] as number)) {
    return false;
  }

  return true;
}

function checkboxChange(val: Option) {
}
</script>