import { reactive } from 'vue'

export type User = {
  name: string
  email: string
  photo: File[]
}

const state = reactive<User>({
  name: '',
  email: '',
  photo: []
})

export function useUser() {
  return state
}