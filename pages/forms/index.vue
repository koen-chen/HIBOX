<template>
  <div class="p-4">
    <el-page-header :icon="null" @back="() => navigateTo('/')">
      <template #title>
        <div class="text-center font-black py-4 text-2xl">{{ $t('Forms') }}</div>
      </template>

      <template #extra>
        <el-button @click="createForm" :loading="createLoading">New Form</el-button>
      </template>
    </el-page-header>

    <el-divider></el-divider>

    <div class="form-list" v-loading="listLoading">
      <TransitionGroup
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
      >
        <el-card
          v-for="item in forms"
          :key="item.id"
          class="form-item"
          body-class="form-item-body"
          @click="navigateTo(`/forms/${item.id}`)"
          v-loading="itemLoading"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <div class="grow w-full">
                <div class="form-title">{{ item.id }} - {{ item.name }}</div>
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
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
const formStore = useFormStore()
const sectionStore = useSectionStore()

const { forms } = storeToRefs(formStore)

const createLoading = ref(false)
const listLoading = ref(false)
const itemLoading = ref(false)

useWatchNull(forms, listLoading, async () => {
  await formStore.fetchForms()
})

const handleCommand = (cmd: string, id: number) => {
  switch (cmd) {
    case 'open':
      window.open(`/forms/${id}`)
      break;

    case 'remove':
      deleteForm(id)
      break;
  }
}

const createForm = async () => {
  createLoading.value = true

  const formData = await formStore.addForm({
    name: 'Untitled Form'
  })

  if (formData) {
    await sectionStore.addSection({
      name: 'Untitled Section',
      form_id: formData.id
    })

    navigateTo(`/forms/${formData.id}`)

    formStore.$patch((state) => {
      if (state.forms) {
        state.forms.unshift(formData)
      }
    })
  } else {
    ElMessage({
      showClose: true,
      message: 'Oops, create form failure!',
      type: 'error',
    })
  }

  createLoading.value = false
}

const deleteForm = async (id: number) => {
  itemLoading.value = true
  await formStore.deleteForm(id)
  itemLoading.value = false
}
</script>

<style lang="scss">
.form-list {
  min-height: 300px;

  @apply flex items-start  flex-wrap
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

