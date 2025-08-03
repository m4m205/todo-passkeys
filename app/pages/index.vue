<script setup lang="ts">
const { loggedIn } = useUserSession()
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold leading-6">
        Todo List
      </h3>
      <div v-if="!loggedIn">
        <UButton
          to="/auth"
          icon="i-ph-fingerprint"
          label="Authenticate"
          color="black"
        />
      </div>
      <UButton
        v-else
        to="/todos"
        icon="i-heroicons-list-bullet"
        label="Go to Todos"
        color="black"
      />
    </template>
    <p class="font-medium">
      Welcome to <span class="font-semibold text-primary-500">TaskyDoo</span>.
    </p>
 
  </UCard>
</template>
