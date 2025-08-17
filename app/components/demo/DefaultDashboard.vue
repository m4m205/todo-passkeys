<script setup lang="ts">
import WidgetFive from './components/WidgetFive.vue';
import RecentOrder from './components/RecentOrder.vue';
import HelpSupport from './components/HelpSupport.vue';
import TransactionHistory from './components/TransactionHistory.vue';
</script>
<template>
<div class="dashboard-page">
   <v-row class="mb-0">
    <v-col cols="12" md="12">
      <WidgetFive />
    </v-col>
   </v-row>

  <v-row class="mb-0">
    <v-col cols="12" md="8">
      <RecentOrder />
    </v-col>
    <v-col cols="12" md="4">
      <v-row>
        <v-col cols="12">
          <TransactionHistory />
        </v-col>
        <v-col cols="12">
          <HelpSupport />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  </div>
</template>
<style lang="scss" scoped>
.dashboard-page {
  width: 100%;  
}
</style>
