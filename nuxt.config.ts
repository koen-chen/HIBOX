import path from 'path'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n'

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY
    }
  },
  css: ['~/assets/styles/main.scss'],
  imports: {
    dirs: ['stores']
  },
  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    'nuxt-icon',
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.yaml'
      },
      {
        code: 'zh',
        file: 'zh.yaml'
      }
    ],
    langDir: 'locales',
    defaultLocale: 'en'
  },

  elementPlus: {
    importStyle: 'scss'
  },
  googleFonts: {
    families: {
      "Roboto+Mono": true,
      "Playfair+Display": true
    }
  },
  pinia: {
    autoImports: [
      "defineStore",
      "storeToRefs",
    ],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/variables.scss" as *;`,
        },
      },
    },
  },
})
