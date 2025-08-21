import { useColorMode } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const colorMode = useColorMode()

  // Access Vuetify instance created by vuetify-nuxt-module
  const vuetify: any = (nuxtApp.vueApp as any).vuetify
  if (!vuetify) return

  const apply = (val: string) => {
    if (vuetify.theme.global.name.value !== val) {
      vuetify.theme.global.name.value = val
    }
  }

  // Initial (SSR + hydration)
  apply(colorMode.value)

  watch(
    () => colorMode.value,
    (val) => apply(val),
    { immediate: false }
  )
})