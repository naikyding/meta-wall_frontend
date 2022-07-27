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

    <!-- FIXED sponsor -->
    <div
      class="sponsor fixed bottom-0 w-full bg-secondary py-2 text-center text-white"
    >
      <div class="flex cursor-pointer items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mr-1 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        SPONSOR
      </div>
    </div>
  </div>
</template>
