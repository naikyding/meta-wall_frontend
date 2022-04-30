<script setup>
import { useLoginStore } from '@/stores/login'
const loginStore = useLoginStore()
</script>

<template>
  <form id="user-data-form" class="flex">
    <div class="img">
      <img src="/images/main.png" alt="meta-wall" />
    </div>
    <div class="input-area">MetaWall</div>
  </form>
</template>
