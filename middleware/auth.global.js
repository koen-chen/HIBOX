export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabase().value

  const { data: { session } } = await supabase.auth.getSession()

  if (!session && (to.path !== '/login')) {
    return navigateTo('/login')
  }

  if (session && (to.path == '/login')) {
    return navigateTo('/templates')
  }
})