<template>
  <div class="w-full">
    <el-row>
      <el-col class="element-move text-center mb-5 cursor-pointer">
        <Icon name="mdi:drag-horizontal" />
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :span="16">
        <el-input size="large" :placeholder="$t('Enter question label')"></el-input>
      </el-col>

      <el-col :span="8">
        <el-select
          class="w-full"
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
    </el-row>

    <el-divider class="mt-10" />

    <div class="flex items-center justify-end">
      <div>
        <span class="mr-2">
          {{ $t('Required') }}
        </span>
        <el-switch
          v-model="required"
          size="large"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
          @change="(val: boolean) => required = val"
          />
      </div>

      <div class="flex items-center">
        <el-divider direction="vertical" style="margin: 0 30px; height: 1.9em" />

        <div>
          <Icon
            class="action-icon"
            name="mdi:trash-can"
            @click="handleDelete"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { Check, Close } from '@element-plus/icons-vue'
import { InputNode, DropdownNode, DateNode, UploadNode, PhoneNode, CountryNode } from '#components'

const NodeList = {
  'Input': InputNode,
  'Textarea': InputNode,
  'Radio': DropdownNode,
  'Checkbox': DropdownNode,
  'Dropdown': DropdownNode,
  'FileUpload': UploadNode,
  'Date': DateNode,
  'Phone': PhoneNode,
  'Country': CountryNode,
  'Email': InputNode,
  'DateOfBirth': DateNode
}

const BasicTypeList = [
  { type: "Textarea", name: "Title & Description", icon: "mdi:format-size", textarea: true, readonly: true, autosize: true  },
  { type: "Input", name: "Short text", icon: "mdi:text-short" },
  { type: "Textarea", name: "Paragraph", icon: "mdi:text", textarea: true, autosize: true },
  { type: "Radio", name: "Radio", icon: "mdi:radiobox-marked", needOtherOption: true, optionIcon: 'mdi:radiobox-blank' },
  { type: "Checkbox", name: "Checkbox", icon: "mdi:checkbox-marked", needOtherOption: true, optionIcon: 'mdi:checkbox-blank-outline'  },
  { type: "Dropdown", name: "Dropdown", icon: "mdi:arrow-down-drop-circle" },
  { type: "FileUpload", name: "File upload", icon: "mdi:cloud-upload" },
  { type: "Date", name: "Date", icon: "mdi:calendar" }
]

const ModulesTypeList = [
  { type: "Phone", name: "Phone", icon: "mdi:cellphone" },
  { type: "Country", name: "Country", icon: "mdi:arrow-down-drop-circle" },
  { type: "Email", name: "Email", icon: "mdi:email",
    rules: [
      (val: string) => {
        const pattern = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
        return pattern.test(val)
      }
    ]
  },
  { type: "DateOfBirth", name: "Date of Birth", icon: "mdi:calendar",
    rules: [
      (val: string) => {
        return dayjs(val).isBefore(dayjs(), 'year')
      }
    ]
  }
]

const typeInfo = ref(null)
const node = shallowRef()
const nodeValue = ref('')
const required = ref(false)

const chooseType = (item: { key: number, type: keyof typeof NodeList, name: string }) => {
  nodeValue.value = ''
  node.value = NodeList[item.type]
}

const handleDelete = () => {
  console.log('delete question')
};
</script>

<style lang="scss" scoped>
.action-icon {
  margin: 0 15px;
  size: 1.4rem;
  color: #7a8182;
  cursor: pointer;
}
</style>