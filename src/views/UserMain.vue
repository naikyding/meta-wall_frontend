<script setup>
import FilterPostByUser from '@/components/FilterPostByUser.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useUserPostsStore } from '../stores/userPosts'
const userStore = useUserStore()
const userPosts = useUserPostsStore()
const route = useRoute()

userPosts.getUserPosts(route.params.id)
</script>

<template>
  <div class="relative mb-4">
    <div
      class="relative bg-white rounded-lg border-2 border-black flex items-center pr-4 z-10"
    >
      <div class="user-avatar w-[80px] h-[80px] border-r-2 border-black">
        <img
          class="w-full h-full object-cover rounded-l-md"
          :src="userPosts.user.avatar"
          :alt="userPosts.user.nickname"
        />
      </div>
      <div class="user-dec grow ml-4">
        <p class="font-bold">{{ userPosts.user.nickname }}</p>
        <p>{{ userPosts.user.follower?.length }} 人追蹤</p>
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

  <FilterPostByUser />
</template>
