<template>
    <v-theme-provider class="min-h-screen flex flex-col" :theme="colorMode.value" with-background>
      <!-- Top Bar -->
      <v-app-bar
        app
        flat
      class="border-b"
    >
      <v-app-bar-nav-icon @click="toggleSidebar" />
      <v-toolbar-title class="text-h6">Tasky</v-toolbar-title>
      <v-spacer />
        <a href="#" v-for="locale in availableLocales" :key="locale.code" @click.prevent.stop="setLocale(locale.code)">
       <span class="mr-2">
          {{ locale.name }}
        </span>
  </a>
      <v-btn icon @click="toggleColorMode">
        <v-icon>{{ colorMode.preference === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
      </v-btn>
      <v-menu v-if="user" offset-y>
        <template #activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
nuxt        <v-list>
          <v-list-item>
            <v-list-item-title>
              {{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ $t('signedInAs') }} {{ user?.username }}
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item @click="clear">
            <v-icon>mdi-logout</v-icon> {{ $t('logout') }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <div class="flex flex-1">
      <!-- Sidebar (desktop and mobile) -->
      <v-navigation-drawer v-model="sidebarOpen" app width="220" class="border-r" temporary>
        <v-list nav>
          <v-list-item v-for="link in navLinks" :key="link.label" :to="link.to" link>
            <v-list-item><v-icon>{{ link.icon }}</v-icon></v-list-item>
            <v-list-item-title>{{ link.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!-- Main Content -->

      <v-main>
        <v-container fluid class="py-4">
            <slot />
        </v-container>
      </v-main>
    </div>
    <footer class="text-center mt-2 mb-4">
      <p>
        <a
          href="https://almorahlee.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary"
        >
          {{ $t('developedBy') }}
        </a>
      </p>
    </footer>
  </v-theme-provider>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useColorMode } from '#imports'

const { user, clear } = useUserSession()
const sidebarOpen = ref(false)
const { locale, locales, setLocale } = useI18n()
const colorMode = useColorMode()

const isArabic = computed({
  get: () => locale.value === 'ar',
  set: (val: boolean) => {
    locale.value = val ? 'ar' : 'en'
  }
})
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

function switchLocale() {
  locale.value = isArabic.value ? 'ar' : 'en'
}

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function toggleColorMode() {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

const navLinks = [
  { label: 'Todos', icon: 'mdi-format-list-bulleted', to: '/todos' },
  { label: 'Auth', icon: 'mdi-account', to: '/auth' },
  { label: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard' },
  // { label: 'Settings', icon: 'mdi-cog', to: '/settings' }
]
</script>

<style scoped>

</style>

<style>
/* Ensure app bar follows color-mode immediately on first paint */
html.dark .v-app-bar {
  background-color: #181818 !important;
  color: #FAFAFA !important;
}
html.light .v-app-bar {
  background-color: #FAFAFA !important;
  color: #181818 !important;
}
</style>
