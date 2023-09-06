<template>
  <div class="w-full">
    <el-row>
      <el-col class="element-move text-center mb-5 cursor-pointer">
        <Icon name="mdi:drag-horizontal" />
      </el-col>
    </el-row>

    <el-row :gutter="16">
      <el-col :span="16">
        <el-input class="input" size="large" :placeholder="$t('Enter question label')"></el-input>
      </el-col>

      <el-col :span="8">
        <el-select
          class="input"
          :placeholder="$t('Choose question type')"
          size="large"
          v-model="typeInfo"
          value-key="name"
          @change="chooseType"
        >
          <el-option-group key="basic" :label="$t('Basic')">
            <el-option v-for="item in BasicTypeList" :key="item.type" :label="item.name" :value="item">
              <div class="flex items-center py-2">
                <Icon :name="item.icon" />
                <div class="ml-5">{{ item.name }}</div>
              </div>
            </el-option>
          </el-option-group>

          <el-option-group key="modules" :label="$t('Modules')">
            <el-option v-for="item in ModulesTypeList" :key="item.type" :label="item.name" :value="item">
              <div class="flex items-center  py-2">
                <Icon :name="item.icon" />
                <div class="ml-5">{{ item.name }}</div>
              </div>
            </el-option>
          </el-option-group>
        </el-select>
      </el-col>
    </el-row>

    <el-row>
       <component :is="node" v-model="nodeValue" v-bind="typeInfo" />
       {{ nodeValue }}
    </el-row>

    <el-divider class="mt-10" />

    <div class="flex items-center justify-end">
      <div>
        <span class="mr-2">
          {{ $t('Required') }}
        </span>
        <el-switch v-model="required" />
      </div>

      <div>
       actions
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InputNode, CheckboxNode, RadioNode, DropdownNode, DateNode, UploadNode } from '#components'

const NodeList = {
  'Input': InputNode,
  'Textarea': InputNode,
  'Radio': RadioNode,
  'Checkbox': CheckboxNode,
  'Dropdown': DropdownNode,
  'FileUpload': UploadNode,
  'Date': DateNode,
  'CodePhone': InputNode,
  'PassportID': InputNode,
  'Country': DropdownNode,
  'Email': InputNode,
  'DateOfBirth': DateNode
}

const BasicTypeList = [
  { type: "Textarea", name: "Title & Description", icon: "mdi:format-size", textarea: true, readonly: true, autosize: true  },
  { type: "Input", name: "Short text", icon: "mdi:text-short" },
  { type: "Textarea", name: "Paragraph", icon: "mdi:text", textarea: true, autosize: true },
  { type: "Radio", name: "Radio", icon: "mdi:radiobox-marked" },
  { type: "Checkbox", name: "Checkbox", icon: "mdi:checkbox-marked" },
  { type: "Dropdown", name: "Dropdown", icon: "mdi:arrow-down-drop-circle" },
  { type: "FileUpload", name: "File upload", icon: "mdi:cloud-upload" },
  { type: "Date", name: "Date", icon: "mdi:calendar" }
]

const ModulesTypeList = [
  { type: "CodePhone", name: "+ Code & Phone", icon: "mdi:cellphone" },
  { type: "PassportID", name: "Passport/ID Number", icon: "mdi:text-short" },
  { type: "Country", name: "Country", icon: "mdi:arrow-down-drop-circle" },
  { type: "Email", name: "Email", icon: "mdi:email" },
  { type: "DateOfBirth", name: "Date of Birth", icon: "mdi:calendar" }
]

const typeInfo = ref()
const node = shallowRef()
const nodeValue = ref('')
const required = ref(false)

const chooseType = (item: { key: number, type: keyof typeof NodeList, name: string }) => {
  node.value = NodeList[item.type]
}
</script>

<style lang="scss">
.input {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #dbe3e4;
  background-color: #fff;
}
</style>