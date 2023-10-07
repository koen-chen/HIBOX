import { useAccountStore } from "@/stores/account"

export default defineNuxtRouteMiddleware(async (to) => {
  const baas = useBaas().value
  const accountStore = useAccountStore()

  const user = await baas.getCurrentUser()

  if (user) {
    accountStore.$patch({
      account: user
    })
  }

  if (user && (to.path == '/login')) {
    return navigateTo('/forms')
  }

  if (!user && ((to.path !== '/') && (to.path !== '/login'))) {
    return navigateTo('/')
  }
})