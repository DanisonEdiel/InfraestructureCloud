<script setup lang="ts">
import NavCollapse from './NavCollapse/NavCollapse.vue';
import NavGroup from './NavGroup/NavGroup.vue';
import NavItem from './NavItem/NavItem.vue';
import sidebarItem from './sidebarItem';

const filteredSidebarMenu = sidebarItem;
</script>

<template>
  
  <v-navigation-drawer left elevation="0" rail-width="60" mobile-breakpoint="lg" app top="0" class="leftSidebar">
    <div class="pa-5">
      <v-chip color="secondary" size="large" class="text-h3">
        <span class="mr-2 px-3">
          <v-icon icon="mdi-comment-text-outline" />
        </span> Post's
      </v-chip>
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
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
