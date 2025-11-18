<script setup lang="ts">
import { ref } from 'vue'
import { useUser } from '../composables/useUser'
import { useUserMutations } from '../composables/useUserMutations'

const user = useUser()
const { saveUserMutation, loading, error } = useUserMutations()
const valid = ref(false)
const submitted = ref<unknown | null>(null)

async function onSubmit() {
  if (!valid.value) return
  submitted.value = await saveUserMutation(user)
}
</script>

<template>
  <v-container class="py-8" max-width="600">
    <v-card>
      <v-card-title>Usuario</v-card-title>
      <v-card-text>
        <v-form v-model="valid" @submit.prevent="onSubmit">
          <v-text-field v-model="user.name" label="Nombre" required />
          <v-text-field v-model="user.email" type="email" label="Email" required />
          <v-file-input v-model="user.photo" label="Foto de perfil" accept="image/*" />
          <v-btn :loading="loading" type="submit" color="primary" class="mt-4">Guardar</v-btn>
          <div v-if="error" class="mt-2">{{ error }}</div>
          <div v-if="submitted" class="mt-2">Guardado</div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
  
</template>