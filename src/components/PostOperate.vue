<template>
  <div class="operate absolute right-0">
    <div class="relative">
      <button
        @click="deletePost.popUpDisplayToggle(props.postId)"
        class="rounded-full p-2 font-bold hover:bg-[#eee]"
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
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      </button>

      <!-- popup -->
      <ul
        :data-post="props.postId"
        class="popup border-1 absolute right-0 hidden min-w-[150px] rounded border border-[#bbb] bg-white p-1"
        @mouseleave="deletePost.popUpDisplayToggle(props.postId)"
      >
        <!-- 加入追蹤 (先判斷是否已加入追蹤) -->
        <li
          v-if="props.userId !== userStore.data.id"
          class="flex w-full cursor-not-allowed items-center justify-start p-2 hover:bg-[#eee]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1 inline-block h-6 w-6"
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
          <span class="text-xs">追蹤發文者</span>
        </li>

        <!-- 刪除貼文 -->
        <li
          @click="deletePost.deletePostItem(props.postId)"
          v-if="props.userId === userStore.data.id"
          class="flex w-full cursor-pointer items-center justify-start p-2 hover:bg-[#eee]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-1 inline-block h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span class="text-xs">刪除貼文</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useDeletePost } from '../stores/userPost'
import { useUserStore } from '@/stores/user'

const deletePost = useDeletePost()
const userStore = useUserStore()

const props = defineProps({
  postId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
})
</script>
