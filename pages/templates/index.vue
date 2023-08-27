<template>
  <div class="flex justify-between p-4">
    <div class="flex ">
      <div v-for="tab in tabs" :key="tab.key" class="tab" :class="{ active: activeKey === tab.key }"
        @click="() => handleTabClick(tab.key)">
        {{ tab.label.toUpperCase() }}({{ tab.count }})
      </div>
    </div>

    <div>
      <el-button type="primary" size="large" @click="handleNewClick">New Template</el-button>
    </div>
  </div>
</template>

<script setup>
const store = useTemplatesStore()
const { templates } = storeToRefs(store)

onMounted(() => {
  store.fetchTemplates()
})

const activeKey = ref('all')

const tabs = ref([
  { label: 'all', key: 'all', count: 0 },
  { label: 'active', key: 'active', count: 0 },
  { label: 'draft', key: 'draft', count: 0 },
  { label: 'trash', key: 'trash', count: 0 },
])

const handleTabClick = (key) => {
  console.log(key)
  activeKey.value = key
}

const handleNewClick = () => {
  return navigateTo('/galleries')
}
</script>

<style lang="scss" scoped>
.tab {
  padding: 0 1.714rem;
  height: 3.143rem;
  line-height: 3.143rem;
  border-radius: 3.143rem;
  text-align: center;
  color: $textSecondary;
  cursor: pointer;

  @apply transition-all;
}

.active {
  color: $text;
  background-color: $primaryHover;
}
</style>

