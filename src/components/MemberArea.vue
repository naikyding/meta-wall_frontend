<script setup>
import { useUserStore } from '@/stores/user'
import { RouterLink } from 'vue-router'

const user = useUserStore()
</script>
<template>
  <ul
    class="sticky top-[75px] border-2 border-black bg-white px-2 pb-8 text-sm font-bold lg:px-6 xl:text-base"
  >
    <!-- 張貼動態 -->
    <li>
      <button @click="$router.push({ path: '/new-post' })" class="base-button">
        張貼動態
      </button>
    </li>

    <li>
      <RouterLink
        :to="{ path: `/user/${user.data.id ? user.data.id : ' '}` }"
        class="group flex items-center"
      >
        <div class="avatar item overflow-hidden">
          <img
            :src="user.data.avatar"
            class="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div class="user-name group-hover:text-primary">
          {{ user.data.nickname }}
        </div>
      </RouterLink>
    </li>

    <!-- 追蹤名單 -->
    <li class="my-[22px]">
      <RouterLink
        to="/follows"
        class="group flex items-center hover:text-primary"
      >
        <div class="item flex-all-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 group-hover:text-[#E2EDFA]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
        <div class="user-name group-hover:text-primary">追蹤名單</div>
      </RouterLink>
    </li>

    <!-- 讚 -->
    <li class="flex items-center">
      <RouterLink
        to="/likes"
        class="group flex w-full items-center hover:text-primary"
      >
        <div class="item flex-all-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 group-hover:text-[#E2EDFA]"
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
        </div>
        <div class="user-name group-hover:text-primary">我按讚的文章</div>
      </RouterLink>
    </li>
  </ul>
</template>

<style>
.item {
  @apply mr-2 h-[35px] w-[35px] rounded-full border-2 border-black bg-[#E2EDFA] group-hover:bg-primary lg:mr-4 lg:h-[50px] lg:w-[50px];
}
</style>
