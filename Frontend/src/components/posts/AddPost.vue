<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue'
import usePostMutations from '@/composables/usePostMutations'
import { DataRequest } from '@/models/Post'
import { toast } from 'vue3-toastify';
const emit = defineEmits<{ (e: 'posted'): void }>()

const { savePostMutation } = usePostMutations()
const valid = ref(false)
const submitted = ref<unknown | null>(null)

const form = ref<DataRequest>({
  name: '',
  comment: '',
  photo: '',
  public_id: ''
} as DataRequest)

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
      toast.success('Publicación creada con éxito')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
}
</script>

<template>
  <v-card class="elevation-1 rounded-lg">
    <v-card-title class="text-h6 px-6 pt-6">Crear publicación</v-card-title>
    <v-card-subtitle class="px-6">Comparte un comentario y una imagen</v-card-subtitle>
    <v-divider class="my-2" />
    <v-card-item class="px-6 pb-6">
      <v-form v-model="valid" @submit.prevent="onSubmit">
        <v-row align="start">
          <v-col cols="12" md="8">
            <v-textarea v-model="form.comment" variant="outlined" color="primary" rows="5" placeholder="Escribe tu comentario" />
            <v-row class="mt-2" dense>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.name" label="Nombre" color="primary" required />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="form.public_id" label="Identificador" color="primary" />
              </v-col>
            </v-row>
            <v-file-input class="mt-2" label="Subir imagen" accept="image/*" show-size clearable variant="outlined" prepend-inner-icon="mdi-image" v-model="files" />
          </v-col>
          <v-col cols="12" md="4">
            <v-sheet v-if="previewUrl" rounded="lg" color="containerBg" class="pa-2">
              <v-img :src="previewUrl" :aspect-ratio="ratio" max-height="280" contain rounded="lg" />
            </v-sheet>
            <v-sheet v-else rounded="lg" color="lightText" class="pa-8 d-flex align-center justify-center">
              <span class="text-subtitle-2 opacity-80">Previsualiza tu imagen aquí</span>
            </v-sheet>
          </v-col>
        </v-row>
        <v-divider class="my-4" />
        <div class="d-flex align-center px-1">
          <v-btn type="submit" color="primary" variant="flat" :loading="savePostMutation.isPending.value">
            <v-icon icon="mdi-send" class="mr-2" />
            Publicar
          </v-btn>
          <v-spacer />
          <v-btn variant="text" color="secondary" @click="form = { name: '', comment: '', photo: '', public_id: '' }; files = null">Limpiar</v-btn>
        </div>
      </v-form>
    </v-card-item>
  </v-card>
</template>