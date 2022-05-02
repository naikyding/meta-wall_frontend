<script setup>
import { RouterView } from 'vue-router'
import NavigationMenu from '../src/components/NavigationMenu.vue'
import { useAppStore } from './stores/app'

const appStore = useAppStore()
</script>

<template>
  <div
    class="bg-grid bg-[length:63px_63px] bg-baseBg bg-center h-full relative"
  >
    <NavigationMenu :class="{ hidden: appStore.navStatus }" />

    <RouterView class="font-dec text-black mt-[60px]" />
  </div>
</template>

<style>
.bg-grid {
  background-image:
    linear-gradient(#70707023 1px, transparent 0),
    linear-gradient(90deg, #70707023 1px, transparent 0);
}
</style>
