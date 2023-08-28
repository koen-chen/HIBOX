import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', () => {
  const supabase = useSupabase().value

  const account = ref(null)

  const login = async (info) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: info.email,
      password: info.password,
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