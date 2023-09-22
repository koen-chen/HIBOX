import { useAccountStore } from "@/stores/account"

export default defineNuxtRouteMiddleware(async (to) => {
  const supabase = useSupabase().value
  const accountStore = useAccountStore()
  const formStore = useFormStore()
  const { account } = storeToRefs(accountStore)
  const { currentForm } = storeToRefs(formStore)

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
    return navigateTo('/forms')
  }

  if (currentForm.value.id == 0 && (to.path != '/forms')) {
    return navigateTo('/forms')
  }
})