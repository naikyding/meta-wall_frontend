<script setup>
import PostModel from '../components/PostModel.vue'
import { day } from '../utils/day'
import { useLikesStore } from '@/stores/likes'
const likesStore = useLikesStore()

likesStore.getUserLikes()
</script>

<template>
  <div
    v-if="likesStore.list?.length < 1"
    class="no-data mt-4 w-full rounded-lg border-2 border-black bg-white shadow-post"
  >
    <div class="bar flex border-b-2 py-5 px-4">
      <div class="dot bg-[#DE4B63]"></div>
      <div class="dot mx-[6px] bg-[#FAA722]"></div>
      <div class="dot bg-[#83C51D]"></div>
    </div>
    <div class="py-8 text-center text-[#9B9893]">目前沒有按讚的貼文！</div>
  </div>

  <div
    v-else
    v-for="item in likesStore.list"
    :key="item._id"
    class="follow-user mt-4 flex items-center rounded-lg border-2 border-black bg-white px-4 py-[18px] shadow-post"
  >
    <div
      class="user-avatar mr-4 h-[40px] w-[40px] overflow-hidden rounded-full"
    >
      <RouterLink :to="{ path: `/user/${item.user._id}` }">
        <img
          :src="item.user.avatar"
          class="h-full w-full object-cover"
          :alt="item.user.name"
        />
      </RouterLink>
    </div>
    <div class="user-data grow">
      <p class="font-bold">
        <RouterLink
          :to="{ path: `/user/${item.user._id}` }"
          class="hover:underline"
        >
          {{ item.user.nickname }}</RouterLink
        >
      </p>
      <div
        class="user-data__time flex flex-col justify-between text-sm sm:flex-row"
      >
        <span class="text-default">發文時間：{{ day(item.createdAt) }}</span>
      </div>
    </div>
    <div class="like_go flex">
      <!-- 移除按讚 -->
      <button
        @click="likesStore.toggleLike({ postId: item._id })"
        class="mr-4 flex flex-col items-center hover:text-primary md:mr-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
          />
        </svg>
        取消
      </button>

      <button
        @click="likesStore.showPost(item._id)"
        class="flex flex-col items-center hover:text-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        查看
      </button>
    </div>
  </div>

  <!-- Model -->
  <PostModel
    :status="likesStore.postModel.status"
    :data="likesStore.activePostContent"
  />
</template>
