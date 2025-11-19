<script setup>
import { Icon } from '@iconify/vue/dist/iconify.js';

const props = defineProps({ item: Object, level: Number });
</script>

<template>
  <v-list-item
    :to="props.item.type === 'external' ? undefined : (props.item.to ? { name: props.item.to } : undefined)"
    :href="props.item.type === 'external' ? props.item.to : undefined"
    rounded
    exact
    class="mb-1"
    :disabled="props.item.disabled"
    :target="props.item.type === 'external' ? '_blank' : undefined"
  >
    <template v-slot:prepend>
      <Icon :icon="props.item.icon" class="iconClass" :level="props.level"></Icon>
    </template>
    <v-list-item-title>{{ props.item.title }}</v-list-item-title>
    <v-list-item-subtitle v-if="props.item.subCaption" class="text-caption mt-n1 hide-menu">
      {{ props.item.subCaption }}
    </v-list-item-subtitle>
    <template v-slot:append v-if="props.item.chip">
      <v-chip
        label
        :color="props.item.chipColor"
        class="sidebarchip hide-menu"
        size="small"
        :variant="props.item.chipVariant"
        :prepend-icon="props.item.chipIcon"
      >
        {{ props.item.chip }}
      </v-chip>
    </template>
  </v-list-item>
</template>

<style scoped>
.v-list-item.v-list-item--active {
  background-color: rgb(var(--v-theme-lightprimary)) !important;
  color: rgb(var(--v-theme-primary)) !important;
  box-shadow: none !important;
}
.v-list-item.v-list-item--active .v-list-item__overlay { background: transparent !important; }
.v-list-item.v-list-item--active .v-list-item-title { color: rgb(var(--v-theme-primary)) !important; }
</style>
