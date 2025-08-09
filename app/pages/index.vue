<script setup lang="ts">
const { loggedIn } = useUserSession()
</script>

<template>
  <v-card class="pa-4">
    <v-card-title>
      <h3 class="text-h6">
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
      <p class="text-body-1 mt-4">
        Welcome to <span class="text-primary font-weight-bold">TaskyDoo</span>.
      </p>
    </v-card-text>
  </v-card>
</template>
