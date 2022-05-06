<script setup>
import { useFollowsStore } from '@/stores/follows'
import { RouterLink } from 'vue-router'

const followStore = useFollowsStore()
</script>

<template>
  <div
    v-for="(user, index) in followStore.list"
    :key="index"
    class="shadow-post follow-user bg-white rounded-lg border-2 border-black mt-4 px-4 py-[18px] flex items-center"
  >
    <div
      class="user-avatar overflow-hidden rounded-full h-[40px] w-[40px] mr-4"
    >
      <img
        :src="user.avatar"
        class="object-cover h-full w-full"
        :alt="user.name"
      />
    </div>
    <div class="user-data grow">
      <p class="font-bold">
        <RouterLink
          :to="{ path: `/user/${123}` }"
          class="underline hover:text-primary"
          >{{ user.name }}</RouterLink
        >
      </p>
      <div
        class="user-data__time flex flex-col sm:flex-row justify-between text-sm"
      >
        <span class="text-default">追蹤時間：{{ user.createdAt }}</span>
        <span>您已追蹤 90 天！</span>
      </div>
    </div>
  </div>
</template>
