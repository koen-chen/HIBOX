<template>
  <div>
    <el-affix :offset="0">
      <Header  backUrl="/">
        <div class="title">{{ $t('Forms') }}</div>

        <template #actions>
          <el-button @click="handleAdd" :loading="addLoading">{{ $t('New Form') }}</el-button>
        </template>
      </Header>
    </el-affix>

    <PageSkeleton :loading="listLoading">
      <div class="w-4/6 mx-auto flex items-start  flex-wrap py-10" >
          <div v-if="publicFormList.length == 0">
            <i18n-t keypath="Click to start a blank form" scope="global">
              <template #link>
                <el-button type="primary" :loading="addLoading" @click="handleAdd" link style="vertical-align: text-bottom; text-decoration: underline">{{ $t('New Form') }}</el-button>
              </template>
            </i18n-t>
          </div>

          <template v-else>
            <el-card
              v-for="item in publicFormList"
              :key="item.id"
              class="form-item"
              body-class="form-item-body"
              @click="navigateTo(`/forms/${item.id}`)"
              v-loading="itemLoading"
            >
              <template #header>
                <div class="flex items-center justify-between">
                  <div class="grow w-full">
                    <div class="form-title">{{ item.name }}</div>
                    <div class="form-desc">{{ item.description }}</div>
                  </div>

                  <el-dropdown trigger="click" @command="(cmd: string) => handleCommand(cmd, item.id)">
                    <div class="ml-4" @click.stop>
                      <Icon name="mdi:dots-vertical" size="18px" />
                    </div>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item command="open" >
                          <div class="flex items-center"><Icon name='mdi:open-in-new' /><span class="pl-2">{{ $t('Open') }}</span></div>
                        </el-dropdown-item>
                        <el-dropdown-item command="remove">
                          <div class="flex items-center"><Icon name='mdi:trash-can-outline' /><span  class="pl-2">{{ $t('Delete') }}</span></div>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </template>
              <div class="flex justify-center items-center h-full w-full">
                <img src="/default-1.png" class="image" />
              </div>
            </el-card>
          </template>
      </div>
    </PageSkeleton>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const formStore = useFormStore()
const { formList } = storeToRefs(formStore)
const publicFormList = computed(() => {
  return formList.value.filter(item => item.state != 'Delete')
})

const sectionStore = useSectionStore()

const addLoading = ref(false)

const listLoading = ref(false)
const listForm = loadingDecorator(formStore.listForm, listLoading)

const itemLoading = ref(false)
const deleteForm = loadingDecorator(formStore.deleteForm, itemLoading)

onMounted(async () => {
  await listForm()
})

function handleCommand(cmd: string, id: string) {
  switch (cmd) {
    case 'open':
      window.open(`/forms/${id}`)
      break;

    case 'remove':
      handleDelete(id)
      break;
  }
}

async function handleAdd() {
  addLoading.value = true

  const formData = await formStore.addForm({
    id: nid(),
    name: 'Untitled Form'
  })

  if (formData) {
    navigateTo(`/forms/${formData.id}`)

    sectionStore.addSection({
      id: nid(),
      name: 'Untitled Section',
      form_id: formData.id
    })
  } else {
    ElMessage({
      showClose: true,
      message: t('Oops, create form failure!'),
      type: 'error',
    })
  }

  addLoading.value = false
}

async function handleDelete(id: string) {
  await deleteForm(id)
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: 900;
  font-size: 1.4rem;
  @include line-clamp(2);

  @apply w-full text-center;
}

.form-item {
  width: 250px;
  margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 4px;
  border: 1px solid $borderColor;
  background-color: $maskColor;
  cursor: pointer;
}

.form-item-body {
  padding: 0;
  height: 150px;
  background-color: $maskColor;
}

.form-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 6px;
  color: $textColor;

  @include line-clamp(1)
}

.form-desc {
  font-size: 0.8rem;
  color: $textSecondaryColor;

  @include line-clamp(2)
}
</style>

