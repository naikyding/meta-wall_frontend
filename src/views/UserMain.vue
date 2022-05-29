<script setup>
import FilterPostByUser from '@/components/FilterPostByUser.vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFollowsStore } from '../stores/follows'
import { useUserStore } from '../stores/user'
import { useUserPostsStore } from '../stores/userPosts'
const userStore = useUserStore()
const userPosts = useUserPostsStore()
const route = useRoute()
const followSotre = useFollowsStore()
const userId = route.params.id
const selfPage = userId === userStore.data.id

userPosts.getUserPosts(userId)
followSotre.getUserFollowList()
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
        v-if="!selfPage"
        @click="userPosts.followUser({ followUserId: userId })"
        class="border-2 border-black shadow-post rounded-lg px-8 py-1 font-bold"
        :class="[
          followSotre.isFollows
            ? 'bg-[#EFECE7] text-black'
            : 'bg-secondary hover:bg-primary hover:text-white',
        ]"
      >
        <span v-if="followSotre.isFollows"> 取消追蹤 </span>
        <span v-else> 追蹤 </span>
      </button>
    </div>
    <div
      class="absolute top-[6px] right-[6px] w-full h-full bg-white rounded-lg border-2 border-black"
    ></div>
  </div>

  <FilterPostByUser />
</template>
