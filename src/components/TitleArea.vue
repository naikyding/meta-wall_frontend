<template>
  <div class="relative">
    <div
      class="relative bg-white border-2 text-xl border-black text-center py-5 z-[1]"
    >
      {{ appStore.contentTopTitle }}
    </div>
    <div
      class="absolute border-2 w-full h-full top-1 right-1 border-black bg-white"
    ></div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
</script>
