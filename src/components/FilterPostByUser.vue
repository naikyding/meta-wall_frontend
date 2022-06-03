<script setup>
import { useUserPostsStore } from '../stores/userPosts'

const userPostsStore = useUserPostsStore()
</script>

<template>
  <div class="grid grid-cols-3 gap-3">
    <!-- select -->
    <div
      class="flex-all-center relative col-span-3 border-2 border-black bg-white sm:col-span-1"
    >
      <select
        v-model="userPostsStore.filter.s"
        class="h-[46px] w-full appearance-none px-4 focus:outline-none"
        @change="
          userPostsStore.getUserPosts(
            $route.params.id,
            userPostsStore.filter.q,
            userPostsStore.filter.s
          )
        "
      >
        <option value="n">最新貼文</option>
        <option value="o">最舊貼文</option>
      </select>
      <svg
        class="fill-current pointer-events-none absolute right-4 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
        />
      </svg>
    </div>
    <!-- input -->
    <div
      class="relative col-span-3 flex border-2 border-black bg-white sm:col-span-2"
    >
      <input
        v-model="userPostsStore.filter.q"
        type="text"
        class="h-[46px] w-full pl-4 pr-[64px] focus:outline-none"
        placeholder="搜尋貼文"
        @keydown.enter="
          userPostsStore.getUserPosts(
            $route.params.id,
            userPostsStore.filter.q,
            userPostsStore.filter.s
          )
        "
      />
      <button
        @click="
          userPostsStore.getUserPosts(
            $route.params.id,
            userPostsStore.filter.q,
            userPostsStore.filter.s
          )
        "
        class="flex-all-center absolute right-0 h-[46px] w-[46px] grow-0 border-l-2 border-black bg-primary text-white hover:bg-secondary hover:text-black active:bg-primary"
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
