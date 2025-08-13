<script setup lang="ts">
const { loggedIn } = useUserSession()
</script>

<template>
  <v-card class="pa-4 mx-auto" min-width="400" max-width="800">
    <v-card-title>
      <h3 class="text-h6">
        Todo List
      </h3>
    </v-card-title>
    <v-card-text class="text-center">
      <div v-if="!loggedIn">
        <v-btn color="primary" to="/auth" prepend-icon="mdi-fingerprint">
          {{ $t('authenticate') }}
        </v-btn>
        <v-img src="/tasky.png" alt="Authentication Image" width="250" class="mx-auto my-8" />
      </div>
      <div v-else>
        <v-btn color="primary" to="/todos" prepend-icon="mdi-format-list-bulleted">
          {{ $t('go_to_todos') }}
        </v-btn>
      </div>
      <p class="text-body-1">
        {{ $t('welcome') }} <span class="text-primary font-weight-bold">TaskyDoo</span>.
      </p>
    </v-card-text>
  </v-card>
</template>
