<script setup>
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify'
const { loggedIn } = useUserSession()
const colorMode = useColorMode()
const theme = useTheme()

const snackbar = ref({ show: false, text: '', color: 'success' })

function showSnackbar({ text, color = 'success' }) {
  snackbar.value = { show: true, text, color }
}

watch(loggedIn, () => {
  if (!loggedIn.value) {
    navigateTo('/')
  }
})

function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

// Sync Vuetify theme with colorMode
watch(
  () => colorMode.preference,
  (val) => {
    val === 'dark' ? theme.change('dark') : theme.change('light')
  },
  { immediate: true }
)

useHead({
  htmlAttrs: { lang: 'en' },
  link: [{ rel: 'icon', href: '/icon.png' }]
})

useSeoMeta({
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  title: 'TaskyDoo',
  description:
    'simple app with passkeys authentication',
  ogImage: '/social-image.png',
  twitterImage: '',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage @notify="showSnackbar" />
    </NuxtLayout>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000" location="top right">
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<style lang="postcss">

</style>
