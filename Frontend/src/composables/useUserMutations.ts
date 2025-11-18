import { ref } from 'vue'
import type { User } from './useUser'

export function useUserMutations() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function saveUserMutation(user: User) {
    loading.value = true
    error.value = null
    try {
      const form = new FormData()
      form.set('name', user.name)
      form.set('email', user.email)
      if (user.photo[0]) form.set('photo', user.photo[0])
      const res = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: form
      })
      if (!res.ok) throw new Error('Error al guardar usuario')
      return await res.json()
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Error'
      throw e
    } finally {
      loading.value = false
    }
  }

  return { saveUserMutation, loading, error }
}