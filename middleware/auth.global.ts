import { useAccountStore } from "@/stores/account"

export default defineNuxtRouteMiddleware(async (to) => {
  const baas = useBaas().value
  const accountStore = useAccountStore()
  const { account } = storeToRefs(accountStore)

  if (account.value !== null) {
    return
  }

  const user = await baas.getCurrentUser()

  if (!user && (to.path !== '/login')) {
    return navigateTo('/login')
  }

  if (user) {
    accountStore.$patch({
      account: user
    })
  }

  if (user && (to.path == '/login')) {
    return navigateTo('/forms')
  }
})