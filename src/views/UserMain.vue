<script setup>
import FilterPost from '@/components/FilterPost.vue'
import { useUserStore } from '../stores/user'
const userStore = useUserStore()
</script>

<template>
  <div class="relative mb-4">
    <div
      class="relative bg-white rounded-lg border-2 border-black flex items-center pr-4 z-10"
    >
      <div class="user-avatar w-[80px] h-[80px] border-r-2 border-black">
        <img
          class="w-full h-full object-cover rounded-l-md"
          :src="userStore.data.avatar"
          alt=""
        />
      </div>
      <div class="user-dec grow ml-4">
        <p class="font-bold">{{ userStore.data.nickname }}</p>
        <p>987,987 人追蹤</p>
      </div>
      <button
        class="bg-secondary border-2 border-black shadow-post rounded-lg px-8 py-1 font-bold"
      >
        追蹤
      </button>
    </div>
    <div
      class="absolute top-[6px] right-[6px] w-full h-full bg-white rounded-lg border-2 border-black"
    ></div>
  </div>

  <FilterPost />
</template>
