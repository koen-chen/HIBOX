import { defineStore } from 'pinia'
import { AccountType } from '~/types'

export const useAccountStore = defineStore('account', () => {
  const baas = useBaas().value
  const account = ref<AccountType | null>(null)

  const login = async (info: { email: string, password: string }): Promise<AccountType | null> => {
    await baas.login({
      email: info.email,
      password: info.password,
    })

    account.value = await baas.getCurrentUser()
    return account.value
  }

  const logout = async (): Promise<void> => {
    await baas.logout()
    account.value = null
  }

  return {
    account,
    login,
    logout
  }
})