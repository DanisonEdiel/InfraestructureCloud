<script setup lang="ts">
import NavCollapse from './NavCollapse/NavCollapse.vue';
import NavGroup from './NavGroup/NavGroup.vue';
import NavItem from './NavItem/NavItem.vue';
import sidebarItem from './sidebarItem';

const filteredSidebarMenu = sidebarItem;
</script>

<template>
  <v-navigation-drawer left elevation="0" rail-width="60" mobile-breakpoint="lg" app class="leftSidebar"
    expand-on-hover>
    <div class="pa-5">
      Aquí va un logo
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">
      <v-list aria-busy="true" aria-label="menu list">
        <!---Menu Loop -->
        <template v-for="(item, i) in filteredSidebarMenu" :key="i">
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <!---Item Divider -->
          <v-divider class="my-3" v-else-if="item.divider" />
          <!---If Has Child -->
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <!---Single Item-->
          <NavItem :item="item" v-else />
          <!---Item Sub Header -->
          <!---End Single Item-->
        </template>
      </v-list>
      <!-- <div class="pa-4">
        <ExtraBox />
      </div> -->
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
