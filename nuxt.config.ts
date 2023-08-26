// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
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
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    'nuxt-icon',
  ],
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
          additionalData: `@use "@/assets/styles/element-plus.scss" as element;`,
        },
      },
    },
  },
})
