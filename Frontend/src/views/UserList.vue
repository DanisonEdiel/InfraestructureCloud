<script setup lang="ts">
import { computed, ref } from 'vue'
import useData from '@/composables/useData'
import { Icon } from '@iconify/vue'

const { data, isDataError, isDataFetching } = useData()
const search = ref('')

const headers = computed(() => [
  { title: 'ID', key: 'id' },
  { title: 'Nombre', key: 'name' },
  { title: 'Comentario', key: 'comment' },
  { title: 'Imagen', key: 'image_url' },
  { title: 'Código', key: 'public_id' },
  { title: 'Creado', key: 'created_at' }
])

function formatDate(val: string) {
  const d = new Date(val)
  return isNaN(d.getTime()) ? val : d.toLocaleString()
}

function cleanUrl(u: string) {
  return String(u || '')
    .trim()
    .replace(/^`+|`+$/g, '')
    .replace(/^"+|"+$/g, '')
    .replace(/^'+|'+$/g, '')
}

function isImageLink(url: string) {
  return /(https?:\/\/).+\.(png|jpe?g|gif|webp|bmp|svg)(\?.*)?$/i.test(url)
}

const items = computed(() => {
  const rows = Array.isArray(data.value) ? data.value : []
  return rows.map((row: any) => {
    if (Array.isArray(row)) {
      return {
        id: row[0],
        name: row[1],
        comment: row[2],
        image_url: cleanUrl(String(row[3] ?? '')),
        public_id: row[4],
        created_at: row[5]
      }
    }
    return row
  })
})
</script>

<template>
  <div class="page-wrapper maxWidth">
    <v-container>
      <v-card class="elevation-1 rounded-lg">
        <v-toolbar color="surface" class="px-4">
          <v-toolbar-title class="heading">Usuarios</v-toolbar-title>
          <v-spacer />
          <v-text-field v-model="search" class="input" density="compact" variant="outlined" placeholder="Buscar"
            hide-details>
            <template #prepend-inner>
              <Icon icon="material-symbols:search" height="24" />
            </template>
          </v-text-field>
        </v-toolbar>
        <v-divider />
        <v-card-text>
          <v-alert v-if="isDataError" type="error" class="single-line-alert mb-4">
            <template #prepend>
              <Icon icon="material-symbols:error-outline-rounded" height="22" />
            </template>
            Ocurrió un error al cargar
          </v-alert>
          <v-skeleton-loader v-if="isDataFetching" type="table" class="mb-4" />
          <v-data-table :headers="headers" :items="items" :loading="isDataFetching" :search="search" items-per-page="10"
            class="elevation-1 rounded-lg" :items-per-page-text="'Items por página'">
            <template #item.image_url="{ item, value }">
              <div class="d-flex align-center gap-3">
                <div class="py-1" v-if="isImageLink(value)">
                  <v-img :src="value" :lazy-src="value" width="64" height="64" rounded="lg" cover />
                </div>
                <div v-else>
                  <Icon icon="material-symbols:image-not-supported" height="54" />
                </div>
              </div>
            </template>
            <template #item.created_at="{ item }">
              {{ formatDate(item?.created_at ?? item?.created_at) }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<style scoped></style>