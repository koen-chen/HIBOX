export const useWatchNull = (data: Ref<any>, loading: Ref<Boolean>, callback: Function) => {
  watch (data, async () => {
    if (data.value == null) {
      loading.value = true
      await callback()
      loading.value = false
    }
  }, { immediate: true })
}