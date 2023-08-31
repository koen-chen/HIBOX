import { defineStore } from 'pinia'
import { Account } from './types'

export const useAccountStore = defineStore('account', () => {
  const supabase = useSupabase().value

  const account = ref<Account | null>(null)

  const login = async ({ email, password }: { email: string, password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (!error) {
      account.value = data.user
    }

    return { error }
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()

    if (!error) {
      account.value = null
    }

    return { error }
  }

  return { account, login, logout }
})