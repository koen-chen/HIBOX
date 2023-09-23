<template>
  <div class="pb-40 form-wrapper">
    <el-affix :offset="0">
      <Header :backUrl="`/forms/${currentForm.id}`">
        <div class="title">
          {{ currentForm.name }}
        </div>
      </Header>
    </el-affix>

    <div class="mx-auto min-h-screen form-content">
      <el-form>
        
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const formStore = useFormStore()
const { currentForm } = storeToRefs(formStore)

const sectionStore= useSectionStore()
const { sectionList } = storeToRefs(sectionStore)

const questionStore = useQuestionStore()
const { questionList } = storeToRefs(questionStore)

const formId = Number(route.params.id)

watchEffect(async () => {
  const result = await formStore.getForm(formId)
  if (result.id == 0) {
    navigateTo('/forms')
  }
})
</script>

<style lang="scss">
.form-wrapper {
  background-color: rgb(240, 240, 240)
}

.form-content {
  width: 800px;
}

.title {
  font-weight: 900;
  font-size: 1.4rem;
  @include line-clamp(2);

  @apply w-full text-center;
}
</style>