<script setup lang="ts">
import { ref, reactive } from 'vue'
import usePostMutations from '../composables/useUserMutations'
import { Icon } from '@iconify/vue'

const { savePostMutation } = usePostMutations()
const valid = ref(false)
const submitted = ref<unknown | null>(null)

type FormState = {
  name: string
  comment: string
  public_id: string
  imageFile: File | null
}

const form = reactive<FormState>({
  name: '',
  comment: '',
  public_id: '',
  imageFile: null
})

const fileInput = ref<HTMLInputElement | null>(null)
const pickFile = () => fileInput.value?.click()
const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files && target.files[0]
  form.imageFile = file || null
}

const onSubmit = () => {
  const fd = new FormData()
  fd.append('name', form.name)
  fd.append('comment', form.comment)
  if (form.public_id) fd.append('public_id', form.public_id)
  if (form.imageFile) fd.append('image', form.imageFile)

  savePostMutation.mutate(fd, {
    onSuccess: (data) => {
      submitted.value = data
      form.name = ''
      form.comment = ''
      form.public_id = ''
      form.imageFile = null
      if (fileInput.value) fileInput.value.value = ''
    }
  })
}
</script>

<template>
    <v-container>
        <v-card variant="outlined">
          <v-card-item>
            <v-form v-model="valid" @submit.prevent="onSubmit">
              <v-textarea v-model="form.comment" variant="outlined" color="primary" placeholder="Comenta algo..." rows="5" />

              <input ref="fileInput" type="file" accept="image/*" class="d-none" @change="onFileChange" />

              <div class="d-flex gap-4 mt-4">
                <v-btn color="inherit" variant="plain" class="opacity-1 px-0" @click="pickFile">
                  <v-avatar size="32" class="me-3" color="primary">
                    <Icon icon="mdi:image" width="16" height="16" />
                  </v-avatar>
                  Foto
                </v-btn>
                <v-btn color="inherit" variant="plain" class="opacity-1 px-0">
                  <v-avatar size="32" color="secondary" class="me-3">
                    <Icon icon="mdi:file-document-outline" width="16" height="16" />
                  </v-avatar>
                  Artículo
                </v-btn>
                <v-spacer />
                <v-btn type="submit" color="primary" variant="flat" :loading="savePostMutation.isPending.value">Post</v-btn>
              </div>

              <div class="mt-4">
                <v-text-field v-model="form.name" label="Nombre" variant="outlined" required></v-text-field>
                <v-text-field v-model="form.public_id" label="Public ID" variant="outlined"></v-text-field>
              </div>
            </v-form>
          </v-card-item>
        </v-card>
    </v-container>
</template>