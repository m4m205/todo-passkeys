<script setup lang="ts">
const { loggedIn } = useUserSession()
</script>

<template>
  <v-card class="pa-4">
    <v-card-title>
      <h3 class="text-lg font-semibold leading-6">
        Todo List
      </h3>
    </v-card-title>
    <v-card-text>
      <div v-if="!loggedIn">
        <v-btn color="primary" to="/auth" prepend-icon="mdi-fingerprint">
          Authenticate
        </v-btn>
      </div>
      <div v-else>
        <v-btn color="primary" to="/todos" prepend-icon="mdi-format-list-bulleted">
          Go to Todos
        </v-btn>
      </div>
      <p class="font-medium mt-4">
        Welcome to <span class="font-semibold text-primary-500">TaskyDoo</span>.
      </p>
    </v-card-text>
  </v-card>
</template>
