<script setup>
import { RouterView } from 'vue-router'
import NavigationMenu from '@/components/NavigationMenu.vue'
import { useAppStore } from './stores/app'
import BottomNavigation from '@/components/BottomNavigation.vue'

const appStore = useAppStore()
</script>

<template>
  <div
    class="bg-grid bg-[length:63px_63px] bg-baseBg bg-center h-screen relative"
  >
    <NavigationMenu :class="{ hidden: appStore.navStatus }" />
    <RouterView class="font-dec text-black pt-[60px]" />
    <BottomNavigation />
  </div>
</template>

<style>
.bg-grid {
  background-image:
    linear-gradient(#70707023 1px, transparent 0),
    linear-gradient(90deg, #70707023 1px, transparent 0);
}
</style>
