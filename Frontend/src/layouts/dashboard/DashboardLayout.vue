<script setup lang="ts">
import { RouterView } from 'vue-router';
import FooterPanel from './footer/FooterPanel.vue';
import LoaderWrapper from './LoaderWrapper.vue';
import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';

</script>

<template>
  <div>
    <v-app>
      <v-main>
        <div class="page-wrapper">
          <div class="page-content">
            <LoaderWrapper />
            <RouterView />
          </div>
          <FooterPanel />
        </div>
      </v-main>
      <VerticalSidebarVue />
    </v-app>
  </div>
</template>

<style>
.page-wrapper {
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
}

.page-content {
  flex-grow: 1;
  padding: 20px;
}
</style>
