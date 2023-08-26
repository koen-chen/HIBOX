import { defineStore } from 'pinia'

const supabase = useSupabase().value

export const useAccountStore = defineStore('account', {
  state: () => ({
    account: null
  }),
  actions: {
    login(info) {
      return supabase.auth.signInWithPassword({
        email: info.email,
        password: info.password,
      })
    },

    logout() {
      return supabase.auth.signOut()
    }
  }
})