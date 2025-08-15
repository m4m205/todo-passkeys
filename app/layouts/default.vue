<template>
  <div class="min-h-screen flex flex-col">
    <!-- Top Bar -->
    <v-app-bar app flat class="border-b" >
      <v-app-bar-nav-icon @click="toggleSidebar" />
      <v-toolbar-title class="text-h6">Tasky</v-toolbar-title>
      <v-spacer />
      <!-- <v-switch
        v-model="isArabic"
        :label="isArabic ? $t('ar') : $t('en')"
        @change="switchLocale"
        hide-details
        class="mx-2"
      /> -->
      <!-- <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
        <span class="mr-2">
          {{ locale.name }}
        </span>
      </NuxtLink> -->
        <a href="#" v-for="locale in availableLocales" :key="locale.code" @click.prevent.stop="setLocale(locale.code)">
       <span class="mr-2">
          {{ locale.name }}
        </span>
  </a>
      <v-btn icon @click="toggleColorMode">
        <v-icon>{{ colorMode.preference === 'dark' ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny' }}</v-icon>
      </v-btn>
      <v-menu v-if="user" offset-y>
        <template #activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
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
      <main class="flex-1 p-4 overflow-auto">
        <v-container fluid>
          <slot />
        </v-container>
      </main>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useColorMode } from '#imports'
import { useTheme } from 'vuetify'

const { user, clear } = useUserSession()
const sidebarOpen = ref(false)
const { locale, locales, setLocale } = useI18n()
const colorMode = useColorMode()
const theme = useTheme()

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
  { label: 'Auth', icon: 'mdi-account', to: '/auth' }
]
</script>

<style scoped>

</style>
