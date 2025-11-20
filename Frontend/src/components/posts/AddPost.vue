<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue'
import usePostMutations from '@/composables/usePostMutations'
import { DataRequest } from '@/models/Post'
const emit = defineEmits<{ (e: 'posted'): void }>()

const { savePostMutation } = usePostMutations()
const valid = ref(false)
const submitted = ref<unknown | null>(null)

const form = ref<DataRequest>({
  name: '',
  comment: '',
  photo: '',
  public_id: ''
})

const files = ref<File | File[] | null>(null)
const currentFile = computed(() => {
  if (!files.value) return null
  return Array.isArray(files.value) ? files.value[0] ?? null : (files.value as File)
})
const previewUrl = computed(() => (currentFile.value ? URL.createObjectURL(currentFile.value) : ''))
onUnmounted(() => { if (previewUrl.value) URL.revokeObjectURL(previewUrl.value) })
const ratio = ref(16 / 9)
watch(previewUrl, (url) => {
  if (!url) { ratio.value = 16 / 9; return }
  const img = new Image()
  img.onload = () => { ratio.value = img.width && img.height ? img.width / img.height : 16 / 9 }
  img.src = url
})

const onSubmit = () => {
  const fd = new FormData()
  fd.append('name', form.value.name)
  fd.append('comment', form.value.comment)
  if (form.value.public_id) fd.append('public_id', form.value.public_id)
  if (currentFile.value) fd.append('photo', currentFile.value)
  else if (form.value.photo) fd.append('photo', form.value.photo)
  savePostMutation.mutate(fd, {
    onSuccess: (data) => {
      submitted.value = data
      form.value = { name: '', comment: '', photo: '', public_id: '' }
      files.value = null
      emit('posted')
    }
  })
}
</script>

<template>
  <v-card variant="outlined">
    <v-card-item>
      <v-form v-model="valid" @submit.prevent="onSubmit">
        <v-textarea v-model="form.comment" variant="outlined" color="primary" placeholder="Comenta algo..." rows="5" />
        <div class="mt-4">
          <v-text-field v-model="form.name" label="Nombre" variant="outlined" required />
          <v-text-field v-model="form.public_id" label="Public ID" variant="outlined" />
        </div>
        <div class="mt-2">
          <v-file-input label="Subir imagen" accept="image/*" show-size prepend-icon="mdi-image" v-model="files" />
          <v-sheet v-if="previewUrl" class="mt-3" rounded="lg" color="grey-lighten-4">
            <v-img :src="previewUrl" :aspect-ratio="ratio" max-height="320" contain rounded="lg" />
          </v-sheet>
        </div>
        <div class="d-flex gap-4 mt-4">
          <v-spacer />
          <v-btn type="submit" color="primary" variant="flat" :loading="savePostMutation.isPending.value">Post</v-btn>
        </div>
      </v-form>
    </v-card-item>
  </v-card>
</template>