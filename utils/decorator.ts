export const loadingDecorator = (fn: Function, loading: Ref) => {
  return async function (...args: any) {
    loading.value = true
    const result = await fn.apply(null, args)
    loading.value = false
    return result
  }
}