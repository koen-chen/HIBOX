import { createI18n } from 'vue-i18n'
import enLang from '~/locales/en.yaml'
import zhLang from '~/locales/zh.yaml'

export default defineNuxtPlugin((nuxtApp) => {
  const messages = {
    en: enLang,
    zh: zhLang
  }

  const i18n = createI18n({
    legacy: false,
    messages: messages,
    locale: 'zh',
    fallbackLocale: 'en',
    detectBrowserLanguage: false
  })

  nuxtApp.vueApp.use(i18n)
})