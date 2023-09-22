import { createClient } from '@supabase/supabase-js'
import { Database } from '~/types'

export const useSupabase = () => useState('supabase', () => {
  const config = useRuntimeConfig()
  const supabase = createClient<Database>(config.public.SUPABASE_URL, config.public.SUPABASE_KEY)
  return supabase
})
