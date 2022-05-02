<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-grid bg-[length:63px_63px] bg-baseBg bg-center h-screen">
    <RouterView class="font-dec text-black" />
  </div>
</template>

<style>
.bg-grid {
  background-image:
    linear-gradient(#70707023 1px, transparent 0),
    linear-gradient(90deg, #70707023 1px, transparent 0);
}
</style>
