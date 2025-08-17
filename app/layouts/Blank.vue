// ===============================|| Blank Layout ||=============================== //
<template>
  <v-app>
    <!-- Loader start -->
    <LoaderWrapper />
    <!-- Loader end -->
    <v-main class="bg-background">
      <v-container fluid class="py-4">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import LoaderWrapper from '../components/Dashboard/LoaderWrapper.vue';
</script>
