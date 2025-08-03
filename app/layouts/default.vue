<template>
  <div class="min-h-screen flex flex-col">
    <!-- Top Bar -->
    <UHeader class="flex items-center justify-between px-4 py-2 border-b">
      <div class="flex items-center gap-2">
        <UButton
          variant="ghost"
          icon="i-heroicons-bars-3"
          label="Menu"
          @click="toggleSidebar"
          aria-label="Toggle sidebar"
        />
      </div>
      <div class="flex items-center gap-4">
        AR
        <v-switch
          v-model="isArabic"
          :on-label="$t('ar')"
          :off-label="$t('en')"
          @change="switchLocale"
        />
        <!-- <UToggle
          v-model="isArabic"
          :on-label="$t('ar')"
          :off-label="$t('en')"
          @change="switchLocale"
        /> -->
        EN
        <UButton
          square
          variant="ghost"
          color="black"
          :icon="$colorMode.preference === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'"
          @click="toggleColorMode"
        />
              <UDropdown
        v-if="user"
        :items="items"
      >
        <UButton
          color="gray"
          icon="i-heroicons-user-circle"
          trailing-icon="i-heroicons-chevron-down-20-solid"
          variant="ghost"
        >
          {{ user.name }}
        </UButton>
        <template #account>
          <div class="flex-1 min-w-0 text-left">
            <p>
              Signed in as {{ user?.username }}
            </p>
          </div>
        </template>
      </UDropdown>
      </div>
    </UHeader>

    <div class="flex flex-1">
      <!-- Sidebar (desktop and mobile) -->
      <UDashboardSidebar v-model="sidebarOpen" class="w-56 border-r bg-gray-50 dark:bg-gray-900" :class="{ 'hidden': !sidebarOpen }" mode="overlay">
        <div class="ml-6 py-6">
          <UNav vertical :links="navLinks">Home</UNav>
        </div>
        <div class="ml-6 mb-6">
          <UNav vertical :links="navLinks">Todos</UNav>
        </div>
        <div class="ml-6 pb-6">
          <UNav vertical :links="navLinks">About</UNav>
        </div>

      </UDashboardSidebar>
      <!-- Main Content -->
      <main class="flex-1 p-4">
        <slot />
      </main>
    </div>
    <footer class="text-center mt-2">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ $t('welcome') }} ❤️ by
        <a
          href="https://almorahlee.com"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Mahmoud
        </a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useColorMode } from '#imports'

const { user, clear } = useUserSession()
const sidebarOpen = ref(false)
const { locale } = useI18n()
const colorMode = useColorMode()

const items = [[{
  slot: 'account',
  label: '',
  disabled: true
}], [{
  label: 'Logout',
  icon: 'i-heroicons-arrow-left-on-rectangle',
  click: clear
}]]

const isArabic = computed({
  get: () => locale.value === 'ar',
  set: (val: boolean) => {
    locale.value = val ? 'ar' : 'en'
  }
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
  { label: 'Todos', icon: 'i-heroicons-list-bullet', to: '/todos' },
  { label: 'Auth', icon: 'i-heroicons-user', to: '/auth' }
]
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
