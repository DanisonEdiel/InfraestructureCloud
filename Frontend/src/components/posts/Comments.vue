<script setup lang="ts">
type Item = {
  id: number
  name: string
  comment: string
  image_url: string
}
const props = defineProps<{ items: Item[] }>()
</script>

<template>
  <v-row>
    <v-col cols="12" md="6" v-for="it in props.items" :key="it.id">
      <v-card class="elevation-1 rounded-lg">
        <v-card-item>
          <div class="d-flex gap-3 align-center">
            <v-avatar size="48">
              <v-img :src="it.image_url" :lazy-src="it.image_url" width="48" height="48" cover rounded="lg" />
            </v-avatar>
            <div class="d-flex flex-column">
              <h6 class="text-h6">{{ it.name }}</h6>
              <span class="text-subtitle-2 opacity-80">{{ it.comment }}</span>
            </div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped></style>
