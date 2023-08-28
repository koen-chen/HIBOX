import { useAccountStore } from "@/stores/account"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabase().value
  const accountStore = useAccountStore()
  const { account } = storeToRefs(accountStore)

  if (account.value !== null) {
    return
  }

  const { data: { session } } = await supabase.auth.getSession()

  if (!session && (to.path !== '/login')) {
    return navigateTo('/login')
  }

  if (session) {
    accountStore.$patch({
      account: session.user
    })
  }

  if (session && (to.path == '/login')) {
    return navigateTo('/templates')
  }
})