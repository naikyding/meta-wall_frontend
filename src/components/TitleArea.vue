<template>
  <div class="relative">
    <div
      class="relative z-[1] border-2 border-black bg-white py-5 text-center text-xl"
    >
      {{ appStore.contentTopTitle }}
    </div>
    <div
      class="absolute top-1 right-1 h-full w-full border-2 border-black bg-white"
    ></div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
</script>
