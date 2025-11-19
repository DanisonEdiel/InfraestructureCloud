<script setup lang="ts">
import { shallowRef } from 'vue';

const footerLink = shallowRef([
  {
    title: 'Sobre Nosotros',
    path: 'http://mentalstudio.com.ec/'
  },
  {
    title: 'Privacidad',
    path: 'http://mentalstudio.com.ec'
  },
  {
    title: 'Términos y condiciones',
    path: 'http://mentalstudio.com.ec'
  }
]);
</script>
<template>
  <v-footer class="px-2 footer">
    <v-row justify="center" no-gutters>
      <v-col cols="6">
        <p class="text-caption mb-0">© Creado con ❤ por Mental Studio</p>
      </v-col>
      <v-col class="text-right" cols="6">
        <a v-for="(item, i) in footerLink" :key="i" class="mx-2 text-caption text-darkText" :href="item.path"
          target="_blank">
          {{ item.title }}
        </a>
      </v-col>
    </v-row>
  </v-footer>
</template>
