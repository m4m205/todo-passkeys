<script setup lang="ts">
definePageMeta({
  middleware: 'guest'
})
const emit = defineEmits(['notify'])
const { fetch } = useUserSession()
const { register, authenticate } = useWebAuthn()
const username = ref('')
const name = ref('')
async function signUp() {
  await register({
    userName: username.value,
    displayName: name.value
  })
    .then(fetch)
    .then(async () => await navigateTo('/todos'))
    .catch((error) => {
      emit('notify', { text: error.data?.message || error.message, color: 'error' })
    })
}
async function signIn() {
  await authenticate(username.value)
    .then(fetch)
    .then(async () => await navigateTo('/todos'))
    .catch((error) => {
      emit('notify', { text: error.data?.message || error.message, color: 'error' })
    })
}

</script>

<template>
  <div class="d-flex justify-center align-center fill-height">
    <v-card class="pa-4" max-width="800" min-width="400">
      <v-card-title>
        <h3 class="text-h6">
          Todo List
        </h3>
        <v-btn to="/" color="grey" variant="text" prepend-icon="mdi-arrow-left">
          {{ $t('backHome') }}
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div class="d-flex flex-column gap-2">
          <v-form class="d-flex flex-column gap-2" @submit.prevent="signUp">
            <v-text-field
              v-model="username"
              name="username"
              :label="$t('username')"
              required
            />
            <v-text-field
              v-model="name"
              name="name"
              :label="$t('fullName')"
              required
            />
            <v-btn
              type="submit"
              color="primary"
              :disabled="!username"
            >{{ $t('signUp') }}</v-btn>
          </v-form>
          <v-divider vertical class="mx-4">{{ $t('or') }}</v-divider>
          <v-form class="d-flex flex-column gap-2" @submit.prevent="signIn">
            <v-text-field
              v-model="username"
              :label="$t('username')"
            />
            <v-btn
              type="submit"
              color="primary"
            >{{ $t('signIn') }}</v-btn>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
