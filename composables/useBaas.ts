import { createClient } from '@supabase/supabase-js'
import cloudbase from "@cloudbase/js-sdk";
import supabaseApp from '~/baas/supabase'
import cloudbaseApp from '~/baas/cloudbase'

export const useBaas = () => useState('baas', () => {
  const config = useRuntimeConfig()
  const baasType = config.public.BAAS_TYPE

  if (baasType == 'SUPABASE') {
    const app = createClient(config.public.SUPABASE_URL, config.public.SUPABASE_KEY)
    return supabaseApp(app)
  } else {
    const app = cloudbase.init({ env: config.public.CLOUDBASE_ID })
    return cloudbaseApp(app)
  }
})