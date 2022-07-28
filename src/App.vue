<script setup>
import { RouterView } from 'vue-router'
import NavigationMenu from '@/components/NavigationMenu.vue'
import { useAppStore } from './stores/app'
import BottomNavigation from '@/components/BottomNavigation.vue'
import LoadingCircle from '@/components/LoadingCircle.vue'
import SponsorUs from '@/components/SponsorUs.vue'
const appStore = useAppStore()
</script>

<template>
  <div
    class="bg-grid relative h-screen overflow-y-auto bg-baseBg bg-[length:63px_63px] bg-center"
    :class="{ 'pb-[100px] md:pb-16': !appStore.navStatus }"
  >
    <LoadingCircle v-show="appStore.loading" />
    <NavigationMenu class="z-50" :class="{ hidden: appStore.navStatus }" />
    <RouterView
      class="font-dec text-black"
      :class="{ 'pt-[60px]': !appStore.navStatus }"
    />
    <BottomNavigation :class="{ hidden: appStore.navStatus }" />
    <SponsorUs />
  </div>
</template>

<style>
.bg-grid {
  background-image:
    linear-gradient(#70707023 1px, transparent 0),
    linear-gradient(90deg, #70707023 1px, transparent 0);
}
</style>
