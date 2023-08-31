import { defineStore } from 'pinia'
import { Account } from '@/types'

export const useAccountStore = defineStore('account', () => {
  const supabase = useSupabase().value

  const account = ref<Account | null>(null)

  const login = async (info: { email: string, password: string }): Promise<Account | null> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: info.email,
      password: info.password,
    })

    if (!error) {
      account.value = data.user
      return account.value
    }

    return null
  }

  const logout = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut()

    if (!error) {
      account.value = null
    }
  }

  return {
    account,
    login,
    logout
  }
})