<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <!-- 沒有貼文 -->
  <div
    v-if="props.list.length < 1"
    class="no-data w-full bg-white border-2 border-black rounded-lg mt-4 shadow-post"
  >
    <div class="bar flex py-5 border-b-2 px-4">
      <div class="dot bg-[#DE4B63]"></div>
      <div class="dot bg-[#FAA722] mx-[6px]"></div>
      <div class="dot bg-[#83C51D]"></div>
    </div>
    <div class="text-center py-8 text-[#9B9893]">
      目前尚無動態，新增一則貼文吧！
    </div>
  </div>

  <!-- 貼文列表 -->
  <div v-else>
    <!-- item-->
    <div
      v-for="item in props.list"
      :key="item"
      class="w-full bg-white border-2 border-black rounded-lg mt-4 shadow-post p-6"
    >
      <!-- 貼文者 -->
      <div class="post-user flex items-center">
        <!-- 頭像 -->
        <div class="avatar overflow-hidden item mr-4">
          <img :src="item.avatar" class="object-cover h-full w-full" alt="" />
        </div>
        <div class="user-dec">
          <p class="font-bold">{{ item.name }}</p>
          <p class="text-xs text-[#9B9893]">{{ item.createdAt }}</p>
        </div>
      </div>

      <!-- 內容 -->
      <div class="content mt-4">
        {{ item.content }}
      </div>

      <details>
        <summary class="list-none focus:outline-none cursor-pointer">
          <!-- 圖片 -->
          <div class="image my-4">
            <img
              class="border-2 border-black rounded-lg w-full"
              :src="item.image"
              :alt="item.content"
            />
          </div>

          <!-- 操作 -->
          <div class="operate flex">
            <!-- likes -->
            <button class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-1"
                :class="[
                  item.likes.length > 0 ? 'text-primary' : 'text-[#9B9893]',
                ]"
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
              <span v-show="item.likes.length > 0" class="text-sm text-primary">
                {{ item.likes.length }}</span
              >
            </button>

            <!-- 留言 -->
            <button class="flex mx-4 items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-1"
                :class="[
                  item.comment.length > 0 ? 'text-primary' : 'text-[#9B9893]',
                ]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span
                v-show="item.comment.length > 0"
                class="text-sm text-primary"
              >
                {{ item.comment.length }}</span
              >
            </button>
          </div>
        </summary>

        <!-- 收折區 -->
        <div>
          <!-- 留言 -->
          <div class="new-post my-[18px] flex items-center">
            <!-- 用戶頭像 -->
            <div class="avatar overflow-hidden item mr-4">
              <img
                :src="userStore.data.avatar"
                class="object-cover h-full w-full"
                alt=""
              />
            </div>
            <!-- input -->
            <div class="input-area flex border-2 border-black w-full h-[40px]">
              <input
                type="text"
                class="focus:outline-none w-full px-4"
                placeholder="留言..."
              />
              <button
                class="w-[128px] bg-primary text-white border-l-2 border-black hover:bg-secondary focus:outline-none hover:text-black focus:ring active:bg-primary"
              >
                留言
              </button>
            </div>
          </div>

          <!-- comments -->
          <div class="comments">
            <!-- item -->
            <div
              v-for="comment in item.comment"
              class="comment__item bg-baseBg/[.4] px-4 py-[18px] rounded-lg my-4"
              :key="comment._id"
            >
              <!-- 貼文者 -->
              <div class="post-user flex">
                <!-- 頭像 -->
                <div class="avatar overflow-hidden item mr-4">
                  <img
                    :src="comment.avatar"
                    class="object-cover h-full w-full"
                    alt=""
                  />
                </div>
                <div class="user-dec">
                  <p class="font-bold">{{ comment.name }}</p>
                  <p class="text-xs text-[#9B9893]">{{ comment.createdAt }}</p>
                  <p class="mt-3">{{ comment.message }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<style>
.dot {
  @apply h-[9px] w-[9px] rounded-full border-[1px] border-[#707070];
}
</style>
