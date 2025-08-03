<script setup>
definePageMeta({
  middleware: 'auth'
})
const loading = ref(false)
const newTodo = ref('')
const newTodoInput = ref(null)

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
  <v-card class="pa-4">
    <v-card-title>
      <h3 class="text-lg font-semibold leading-6">
        <NuxtLink to="/">
          Todo List
        </NuxtLink>
      </h3>
    </v-card-title>
    <v-card-text>
      <form class="flex items-center gap-2" @submit.prevent="addTodo">
        <v-text-field
          ref="newTodoInput"
          v-model="newTodo"
          name="todo"
          :disabled="loading"
          class="flex-1"
          placeholder="Make a Nuxt demo"
          autocomplete="off"
          autofocus
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
          <v-list-item-content>
            <div class="flex items-center gap-4 w-full">
              <span class="flex-1 font-medium" :class="[todo.completed ? 'line-through text-gray-500' : '']">
                {{ todo.title }}
              </span>
              <v-switch
                v-model="todo.completed"
                @change="toggleTodo(todo)"
                hide-details
                color="primary"
                class="shrink-0"
              />
              <v-btn icon color="red" @click="deleteTodo(todo)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
