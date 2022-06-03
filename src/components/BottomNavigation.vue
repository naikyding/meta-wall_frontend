<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="fixed bottom-4 left-0 block w-full px-4 md:hidden">
    <ul
      class="flex h-[65px] items-center justify-around rounded-r-full rounded-l-full border-[3px] border-black bg-baseBg px-10"
    >
      <!-- home -->
      <li class="">
        <a href="/" class="router-item bg-white hover:bg-[#E2EDFA]">
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
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </a>
      </li>

      <!-- 追蹤名單 -->
      <li class="">
        <RouterLink
          to="/follows"
          class="router-item bg-white hover:bg-[#E2EDFA]"
        >
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
        </RouterLink>
      </li>

      <!-- 讚 -->
      <li class="">
        <RouterLink to="/likes" class="router-item bg-white hover:bg-[#E2EDFA]">
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
        </RouterLink>
      </li>

      <!-- 新增貼文 -->
      <li class="">
        <RouterLink
          to="/new-post"
          class="router-item bg-primary hover:bg-secondary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style>
.router-item {
  @apply flex-all-center h-[48px] w-[48px] rounded-full border-[3px] border-black;
}
</style>
