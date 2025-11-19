<script setup lang="ts">
import AddPost from '@/components/posts/AddPost.vue';
import Comments from '@/components/posts/Comments.vue';
import PostItem from '@/components/posts/PostItem.vue';
import useData from '@/composables/useData';
import { computed } from 'vue';

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
</script>

<template>
  <div>
    <v-container>
      <AddPost @posted="dataQuery.refetch()" />
      <Comments :items="items" />
    </v-container>
  </div>
</template>

<style scoped>

</style>