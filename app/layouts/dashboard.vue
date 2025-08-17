<script setup lang="ts">
import { useCustomizerStore } from '../stores/customizer'
const customizer = useCustomizerStore()
</script>

<template>
  <v-locale-provider>
    <v-app :class="[customizer.mini_sidebar ? 'mini-sidebar' : '']">
      <DashboardVerticalSidebar />
      <DashboardVerticalHeader />

      <v-main class="page-wrapper">
        <v-container fluid>
          <div>
            <!-- Loader start -->
            <DashboardLoaderWrapper />
            <!-- Loader end -->
            <slot />
          </div>
        </v-container>
        <v-container fluid class="pt-0">
          <div>
            <DashboardFooterPanel />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
