<script setup>
import { ref, watch } from 'vue'
import { useTheme } from 'vuetify'
// import 'ant-design-vue/dist/reset.css';

const { loggedIn } = useUserSession()
const colorMode = useColorMode()
const theme = useTheme()
const route = useRoute();

const snackbar = ref({ show: false, text: '', color: 'success' })

function showSnackbar({ text, color = 'success' }) {
  snackbar.value = { show: true, text, color }
}

const layout = computed(() => {
  // If the route path starts with '/dashboard', use the 'admin' layout
  if (route.path.startsWith('/dashboard')
      || route.path.startsWith('/samplePage')
  ) {
    return 'dashboard'
  }

    if (route.path.startsWith('/error')
    || route.path.startsWith('/register')
    || route.path.startsWith('/login1')) {
    return 'blank'
  }
  
  // Otherwise, use the 'default' layout
  return 'default'
})

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
    <NuxtLayout :name="layout">
      <NuxtPage @notify="showSnackbar" />
    </NuxtLayout>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000" location="top right">
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<style lang="postcss">


</style>
