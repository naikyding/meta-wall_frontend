<script setup>
import MemberArea from '@/components/MemberArea.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <main
      class="post-list grid grid-cols-5 gap-0 px-4 pt-4 md:px-12 lg:px-0 lg:pt-[49px]"
    >
      <!-- post -->
      <div
        class="col=start-1 col-span-5 pr-0 md:col-span-4 md:col-start-1 md:pr-6 lg:col-span-2 lg:col-start-2"
      >
        <RouterView name="content-top" />
        <RouterView name="content-bottom" />
      </div>

      <!-- 個人資料 -->
      <div class="hidden md:block">
        <MemberArea class="" />
      </div>
    </main>
  </div>
</template>
