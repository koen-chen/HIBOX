import ViteYaml from '@modyfi/vite-plugin-yaml';

export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: false,

  runtimeConfig: {
    SUPABASE_URL: '',
    SUPABASE_KEY: '',
    public: {
      SUPABASE_URL: '',
      SUPABASE_KEY: '',
      CLOUDBASE_ID: '',
      BAAS_TYPE: ''
    }
  },

  css: [
    'animate.css/animate.min.css',
    '~/assets/styles/main.scss'
  ],

  imports: {
    dirs: ['stores'],
    presets: [
      {
        from: 'vue-i18n',
        imports: ['useI18n']
      }
    ]
  },

  components: [
    { path: '~/components', pathPrefix: false }
  ],

  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icon',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    'nuxt-lodash'
  ],

  lodash: {
    prefix: "_"
  },

  elementPlus: {
    importStyle: 'scss'
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
          additionalData: `@use "~/assets/styles/variables.scss" as *; @use "~/assets/styles/minix.scss" as *;`,
        },
      },
    },
    plugins: [
      ViteYaml()
    ]
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        strictNullChecks: true,
        esModuleInterop: true
      }
    }
  }
})
