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
    class="no-data w-full bg-white border-2 border-black rounded-lg mt-4 shadow-post"
  >
    <div class="bar flex py-5 border-b-2 px-4">
      <div class="dot bg-[#DE4B63]"></div>
      <div class="dot bg-[#FAA722] mx-[6px]"></div>
      <div class="dot bg-[#83C51D]"></div>
    </div>
    <div class="text-center py-8 text-[#9B9893]">
      目前沒有追蹤名單，新增一個吧！
    </div>
  </div>

  <div
    v-else
    v-for="(item, index) in followStore.list"
    :key="index"
    class="shadow-post follow-user bg-white rounded-lg border-2 border-black mt-4 px-4 py-[18px] flex items-center"
  >
    <div
      class="user-avatar overflow-hidden rounded-full h-[40px] w-[40px] mr-4"
    >
      <RouterLink :to="{ path: `/user/${item.userId._id}` }">
        <img
          :src="item.userId.avatar"
          class="object-cover h-full w-full"
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
        class="user-data__time flex flex-col sm:flex-row justify-between text-sm"
      >
        <span class="text-default">追蹤時間：{{ day(item.createdAt) }}</span>
        <span>您已追蹤 {{ dayToNow(item.createdAt) }}！</span>
      </div>
    </div>
  </div>
</template>
