<template>
  <div>
    <el-row>
      <el-col className="element-move text-center mb-5 cursor-pointer">
        <Icon name="mdi:drag-horizontal" />
      </el-col>
    </el-row>>

    <el-row>
      <el-col >
        <el-input :placeholder="$t('Enter question label')"></el-input>
      </el-col>

      <el-col >
        <el-select v-model="type" :placeholder="$t('Choose question type')">
          <el-option-group key="basic" :label="$t('Basic')">
            <el-option v-for="item in BasicTypeList" :key="item.type" :label="item.type" :value="item.type">
              <div>
                <Icon :name="item.icon" />
                <div className="ml-5">{{ item.name }}</div>
              </div>
            </el-option>
          </el-option-group>

          <el-option-group key="modules" :label="$t('Modules')">
            <el-option v-for="item in ModulesTypeList" :key="item.type" :label="item.type" :value="item.type">
              <div>
                <Icon :name="item.icon" />
                <div className="ml-5">{{ item.name }}</div>
              </div>
            </el-option>
          </el-option-group>
        </el-select>
      </el-col>
    </el-row>

    <el-row>
       type node
    </el-row>

    <el-divider></el-divider>

    <el-row>
      <el-col>
        <span className="mr-2">
          {{ $t('Required') }}
        </span>
        <el-switch v-model="required" />
      </el-col>

      <el-col>
       actions
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
const BasicTypeList = [
  { type: "DescriptionBox", name: "Title & Description", icon: "mdi:format-size" },
  { type: "InputBox", name: "Short text", icon: "mdi:text-short" },
  { type: "TextareaBox", name: "Paragraph", icon: "mdi:text" },
  { type: "RadioBox", name: "Radio", icon: "mdi:radiobox-marked" },
  { type: "CheckboxBox", name: "Checkbox", icon: "mdi:checkbox-marked" },
  { type: "DropdownBox", name: "Dropdown", icon: "mdi:arrow-down-drop-circle" },
  { type: "FileUploadBox", name: "File upload", icon: "mdi:cloud-upload" },
  { type: "DateBox", name: "Date", icon: "mdi:calendar" },
]

const ModulesTypeList = [
  { type: "CodePhoneBox", name: "+ Code & Phone", icon: "mdi:cellphone" },
  { type: "CompanyNameBox", name: "Company Name", icon: "mdi:text-short" },
  { type: "FullNameBox", name: "Full Name", icon: "mdi:text-short" },
  { type: "PassportIDBox", name: "Passport/ID Number", icon: "mdi:text-short" },
  { type: "PostalCodeBox", name: "Postal Code", icon: "mdi:text-short" },
  { type: "ResidentialAddressBox", name: "Residential Address", icon: "mdi:text-short" },
  { type: "CountryBox", name: "Country", icon: "mdi:arrow-down-drop-circle" },
  { type: "EmailBox", name: "Email", icon: "mdi:email" },
  { type: "DateOfBirthBox", name: "Date of Birth", icon: "mdi:calendar" },
]

const type = ref(null)
const label = ref(null)
const required = ref(false)
const associate = ref(false)
</script>