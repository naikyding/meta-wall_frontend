<script setup>
import { useFollowsStore } from '@/stores/follows'
import { RouterLink } from 'vue-router'
import { day, dayToNow } from '../utils/day'
const followStore = useFollowsStore()

followStore.getUserFollowList()
</script>

<template>
  <div
    v-if="followStore.list.length < 1"
    class="no-data mt-4 w-full rounded-lg border-2 border-black bg-white shadow-post"
  >
    <div class="bar flex border-b-2 py-5 px-4">
      <div class="dot bg-[#DE4B63]"></div>
      <div class="dot mx-[6px] bg-[#FAA722]"></div>
      <div class="dot bg-[#83C51D]"></div>
    </div>
    <div class="py-8 text-center text-[#9B9893]">
      目前沒有追蹤名單，新增一個吧！
    </div>
  </div>

  <div
    v-else
    v-for="(item, index) in followStore.list"
    :key="index"
    class="follow-user mt-4 flex items-center rounded-lg border-2 border-black bg-white px-4 py-[18px] shadow-post"
  >
    <div
      class="user-avatar mr-4 h-[40px] w-[40px] overflow-hidden rounded-full"
    >
      <RouterLink :to="{ path: `/user/${item.userId._id}` }">
        <img
          :src="item.userId.avatar"
          class="h-full w-full object-cover"
          :alt="item.userId.nickname"
        />
      </RouterLink>
    </div>
    <div class="user-data grow">
      <p class="font-bold">
        <RouterLink
          :to="{ path: `/user/${item.userId._id}` }"
          class="hover:underline"
          >{{ item.userId.nickname }}</RouterLink
        >
      </p>
      <div
        class="user-data__time flex flex-col justify-between text-sm sm:flex-row"
      >
        <span class="text-default">追蹤時間：{{ day(item.createdAt) }}</span>
        <span>您已追蹤 {{ dayToNow(item.createdAt) }}！</span>
      </div>
    </div>
  </div>
</template>
