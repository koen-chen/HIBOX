import { createClient } from '@supabase/supabase-js'

export default defineEventHandler((event) => {
  if (getRequestHeader(event, 'Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    setResponseStatus(event, 401)
    return 'Unauthorized'
  }

  async function getUser () {
    const config = useRuntimeConfig(event)
    const app = createClient(config.SUPABASE_URL, config.SUPABASE_KEY)
    const auth = app.auth
    const { data: { user } } = await auth.getUser()
    return user
  }

  const user = getUser()

  const name = user ? 'Koen' : 'World'
  
  return `Hello ${name} !`
})