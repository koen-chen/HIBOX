import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => useState('supabase', () => {
  const config = useRuntimeConfig()
  const supabase = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_KEY)
  return supabase
})
