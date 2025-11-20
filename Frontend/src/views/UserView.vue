<script setup lang="ts">
import AddPost from '@/components/posts/AddPost.vue';
import Comments from '@/components/posts/Comments.vue';
import useData from '@/composables/useData';
import { computed, ref } from 'vue';

const { data, isDataFetching, isDataError, dataQuery } = useData()

function cleanUrl(u: string) {
  return String(u || '').trim().replace(/^`+|`+$/g, '').replace(/^"+|"+$/g, '').replace(/^'+|'+$/g, '')
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

const search = ref('')
const visibleItems = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return items.value
  return items.value.filter(it =>
    String(it.name || '').toLowerCase().includes(q) ||
    String(it.comment || '').toLowerCase().includes(q) ||
    String(it.public_id || '').toLowerCase().includes(q)
  )
})

const greetings = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Buenos días'
  if (hour < 18) return 'Buenas tardes'
  return 'Buenas noches'
}
</script>

<template>
  <div class="page-wrapper maxWidth"> 
    <v-container>
      <v-card class="elevation-1 rounded-lg mb-4">
        <v-toolbar class="px-4" color="surface" density="comfortable">
          <v-toolbar-title class="text-h4 gradient-text"> ¡{{ greetings() }}! </v-toolbar-title>
          <v-spacer />
          <v-text-field v-model="search" class="input" density="compact" variant="outlined" placeholder="Buscar" hide-details style="max-width: 280px" />
          <v-btn class="ml-2" icon color="primary" variant="text" @click="dataQuery.refetch()"><v-icon icon="mdi-refresh" /></v-btn>
        </v-toolbar>
      </v-card>

      <AddPost class="mb-6" @posted="dataQuery.refetch()" />
      
      <v-alert v-if="isDataError" type="error" class="single-line-alert mb-4">
        <template #prepend><v-icon icon="mdi-alert-circle-outline" /></template>
        Ocurrió un error al cargar
      </v-alert>
      
      <v-skeleton-loader v-if="isDataFetching" type="article, article" class="mb-6" />
      
      <div v-else class="g-4">
        <Comments :items="visibleItems" />
      </div>
    </v-container>
  </div>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(45deg, #eba1a1, #10b981, #8b5cf6, #f59e0b);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline;
  animation: gradientShift 4s ease-in-out infinite;
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}
</style>