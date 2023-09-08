export const useWatchNull = (data: any, loading: Ref<Boolean> | null, callback: Function) => {
  watch (data, async () => {
    if (data == null) {
      loading && (loading.value = true)
      await callback()
      loading && (loading.value = false)
    }
  }, { immediate: true })
}