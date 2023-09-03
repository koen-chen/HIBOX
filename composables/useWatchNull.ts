export const useWatchNull = (data: Ref<any>, loading: Ref<Boolean> | null, callback: Function) => {
  watch (data, async () => {
    if (data.value == null) {
      loading && (loading.value = true)
      await callback()
      loading && (loading.value = false)
    }
  }, { immediate: true })
}