export default defineNuxtConfig({
    app: {
    head: {
      title: 'TaksyDoo',
      htmlAttrs: {
        style: 'background-color: #111; color: #f0f0f0;'
      },
      meta: [
        { name: 'TaskyDoo', content: 'TaskyDoo to-do list' }
      ]
    }
  },
  modules: [
    '@nuxthub/core',
    'nuxt-auth-utils',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    'vuetify-nuxt-module',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
  ],
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  },
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
        dir: 'ltr',
        language: 'en-US'
      },
      {
        code: 'ar',
        name: 'Arabic',
        file: 'ar.json',
        dir: 'rtl',
        language: 'ar-EG'
      },
    ],
    defaultLocale: 'ar',
  langDir: 'locales/',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false,
      fallbackLocale: 'ar'
    }
  },
  devtools: {
    enabled: true
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-09-30',
  hub: {
    database: true,
    kv: true
  },
  auth: {
    webAuthn: true
  },
  // Development config
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  },
  css: [
  // '@/assets/css/globals.scss'
  ],
  vuetify: {
    moduleOptions: {
      // styles: { configFile: 'assets/css/components.scss' },
      // disableVuetifyStyles: true,
      // disableModernSassCompiler: true,
    },
    vuetifyOptions: {
      locale: {
        rtl: {
          ar: true
        },
        fallback: 'ar',
        locale: 'ar',
      },
      theme: {
        themes: {
          light: {
            dark: false,
            colors: {
              background: '#FAFAFA',
              surface: '#FFFFFF',
              primary: '#1976D2',
              secondary: '#424242',
              accent: '#82B1FF',
              error: '#FF5252',
              info: '#2196F3',
              success: '#4CAF50',
              warning: '#FFC107',
              'on-background': '#181818',
              'on-surface': '#181818',
            }
          },
          dark: {
            dark: true,
            colors: {
              background: '#181818',
              surface: '#232323',
              primary: '#90CAF9',
              secondary: '#B0BEC5',
              accent: '#FF4081',
              error: '#FF5252',
              info: '#2196F3',
              success: '#4CAF50',
              warning: '#FFC107',
              'on-background': '#FAFAFA',
              'on-surface': '#FAFAFA',
            }
          }
        }
      }
    }
  },
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: '@import "@/scss/style.scss";'
  //       }
  //     }
  //   }
  // },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3000/api'
    }
  }
})