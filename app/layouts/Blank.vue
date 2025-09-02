// ===============================|| Blank Layout ||=============================== //
<template>
  <v-app>
    <!-- Loader start -->
    <LoaderWrapper />
    <!-- Loader end -->
     <v-theme-provider class="min-h-screen flex flex-col" :theme="colorMode.value" with-background>
       <v-main class="bg-background">
         <v-container fluid class="py-4">
           <slot />
         </v-container>
       </v-main>
     </v-theme-provider>
  </v-app>
</template>
<script setup lang="ts">
import LoaderWrapper from '../components/Dashboard/LoaderWrapper.vue';
const colorMode = useColorMode()
</script>
