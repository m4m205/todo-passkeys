<script setup>
definePageMeta({
  middleware: 'auth'
})
const loading = ref(false)
const newTodo = ref('')
const newTodoInput = ref(null)
const { mobile } = useDisplay()

const emit = defineEmits(['notify'])
const { data: todos, refresh } = await useFetch('/api/todos')

async function addTodo() {
  if (!newTodo.value.trim()) return

  loading.value = true

  try {
    const todo = await $fetch('/api/todos', {
      method: 'POST',
      body: {
        title: newTodo.value,
        completed: 0
      }
    })
    todos.value.push(todo)
    await refresh()
    emit('notify', { text: `Todo "${todo.title}" created.`, color: 'success' })
    newTodo.value = ''
    nextTick(() => {
      newTodoInput.value?.input?.focus()
    })
  }
  catch (err) {
    if (err.data?.data?.issues) {
      const title = err.data.data.issues.map(issue => issue.message).join('\n')
      emit('notify', { text: title, color: 'error' })
    }
  }
  loading.value = false
}

async function toggleTodo(todo) {
  todo.completed = Number(!todo.completed)
  await $fetch(`/api/todos/${todo.id}`, {
    method: 'PATCH',
    body: {
      completed: todo.completed
    }
  })
  await refresh()
}

async function deleteTodo(todo) {
  await $fetch(`/api/todos/${todo.id}`, { method: 'DELETE' })
  todos.value = todos.value.filter(t => t.id !== todo.id)
  await refresh()
  emit('notify', { text: `Todo "${todo.title}" deleted.`, color: 'success' })
}

</script>

<template>
  <div class="d-flex justify-center align-center fill-height">
    <v-card class="pa-4" max-width="800" min-width="400" mx-auto>
      <v-card-title>
        <h3 class="text-h6">
          <NuxtLink to="/" class="text-decoration-none">
            Todo List
          </NuxtLink>
        </h3>
      </v-card-title>
      <v-card-text>
        <form class="d-flex align-center items-center" @submit.prevent="addTodo">
          <v-text-field
            ref="newTodoInput"
            v-model="newTodo"
            name="todo"
            :disabled="loading"
            class="flex-1 mr-2"
            placeholder="Make a Nuxt demo"
            autocomplete="off"
            autofocus
            hide-details
          />
          <v-btn
            type="submit"
            color="primary"
            :disabled="loading || newTodo.trim().length === 0"
            :loading="loading"
            icon
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </form>
        <v-list class="mt-4">
          <v-list-item
            v-for="todo of todos"
            :key="todo.id"
            class="py-2"
          >
            <v-list-item>
              <div class="d-flex align-center gap-4 w-100">
                <span class="text-body-1 flex-grow-1" :class="[todo.completed ? 'text-decoration-line-through text-grey-darken-1' : '']">
                  {{ todo.title }}
                </span>
                <v-switch
                  :value="Boolean(todo.completed)"
                  @change="toggleTodo(todo)"
                  hide-details
                  color="primary"
                  class="flex-shrink-0 pr-2"
                  :inset="mobile"
                />
                <v-btn icon size="x-small" color="red" @click="deleteTodo(todo)">
                  <v-icon size="small">mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-list-item>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>
