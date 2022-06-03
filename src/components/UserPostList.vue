<script setup>
import { useUserStore } from '@/stores/user'
import { useUserPostsStore } from '../stores/userPosts'
import { useLikesStore } from '../stores/likes'
import { dayToNow, day } from '../utils/day'
import { useCommentStore } from '../stores/comments'
import { RouterLink } from 'vue-router'
const userStore = useUserStore()

const likesStore = useLikesStore()
const commentStore = useCommentStore()
const userPostStore = useUserPostsStore()
</script>

<template>
  <!-- 沒有貼文 -->
  <div
    v-if="userPostStore.list?.length < 1"
    class="no-data mt-4 w-full rounded-lg border-2 border-black bg-white shadow-post"
  >
    <div class="bar flex border-b-2 py-5 px-4">
      <div class="dot bg-[#DE4B63]"></div>
      <div class="dot mx-[6px] bg-[#FAA722]"></div>
      <div class="dot bg-[#83C51D]"></div>
    </div>
    <div class="py-8 text-center text-[#9B9893]">
      目前尚無動態，新增一則貼文吧！
    </div>
  </div>

  <!-- 貼文列表 -->
  <div v-else>
    <!-- item-->
    <div
      v-for="item in userPostStore.list"
      :key="item._id"
      class="mt-4 w-full rounded-lg border-2 border-black bg-white p-6 shadow-post"
    >
      <!-- 貼文者 -->
      <div class="post-user flex items-center">
        <!-- 頭像 -->
        <div class="avatar item mr-4 h-[45px] w-[45px] overflow-hidden">
          <RouterLink :to="{ path: `/user/${userPostStore.user._id}` }">
            <img
              :src="userPostStore.user?.avatar"
              class="h-full w-full object-cover"
              alt=""
            />
          </RouterLink>
        </div>
        <div class="user-dec">
          <p class="font-bold">
            <RouterLink
              class="hover:underline"
              :to="{ path: `/user/${userPostStore.user._id}` }"
            >
              {{ userPostStore.user?.nickname }}
            </RouterLink>
          </p>
          <p class="text-xs text-[#9B9893]">{{ day(item.createdAt) }}</p>
        </div>
      </div>

      <details
        :class="`details_${item._id}`"
        @toggle="userPostStore.getPostComments($event, item._id)"
      >
        <summary class="cursor-pointer list-none focus:outline-none">
          <!-- 內容 -->
          <div class="content mt-4">
            {{ item.content }}
          </div>

          <!-- 圖片 -->
          <div v-show="item.image" class="image my-4">
            <img
              class="w-full rounded-lg border-2 border-black"
              :src="item.image"
              :alt="item.content"
            />
          </div>

          <!-- 操作 -->
          <div class="operate flex">
            <!-- likes -->
            <button
              @click="
                likesStore.toggleLike(
                  { postId: item._id },
                  $refs[`details_${item._id}`]
                )
              "
              class="flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-1 h-6 w-6"
                :class="[
                  item.likes.includes(userStore.data.id)
                    ? 'text-primary'
                    : 'text-[#9B9893]',
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
              <span
                v-show="item.likes?.length > 0"
                class="text-sm text-primary"
              >
                {{ item.likes?.length }}</span
              >
            </button>

            <!-- 留言 -->
            <button class="pointer-events-none mx-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-1 h-6 w-6"
                :class="[
                  item.comments?.length > 0 ? 'text-primary' : 'text-[#9B9893]',
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
                v-show="item.comments?.length > 0"
                class="text-sm text-primary"
              >
                {{ item.comments?.length }}</span
              >
            </button>
          </div>
        </summary>

        <!-- 收折區 -->
        <div>
          <!-- 留言 -->
          <div class="new-post my-[18px] flex items-center">
            <!-- 用戶頭像 -->
            <div class="avatar item h-[45px] w-[45px] overflow-hidden">
              <img
                :src="userStore.data.avatar"
                class="h-full w-full object-cover"
                alt=""
              />
            </div>
            <!-- input -->
            <div class="input-area flex h-[40px] flex-1 border-2 border-black">
              <input
                type="text"
                class="w-full px-4 focus:outline-none"
                placeholder="留言..."
                v-model="commentStore.form.content"
              />
              <button
                @click="
                  commentStore.comment({
                    postId: item._id,
                    content: commentStore.form.content,
                  })
                "
                class="w-[128px] border-l-2 border-black bg-primary text-white hover:bg-secondary hover:text-black focus:outline-none focus:ring active:bg-primary"
              >
                留言
              </button>
            </div>
          </div>

          <!-- comments -->
          <div class="comments">
            <!-- item -->
            <div
              v-for="comment in item.comments"
              class="comment__item my-4 rounded-lg bg-baseBg/[.4] px-4 py-[18px]"
              :key="comment._id"
            >
              <!-- 貼文者 -->
              <div class="post-user flex">
                <!-- 頭像 -->
                <div class="avatar item mr-4 overflow-hidden">
                  <RouterLink :to="{ path: `/user/${comment.user?._id}` }">
                    <img
                      :src="comment.user?.avatar"
                      class="h-full w-full object-cover"
                      :alt="comment.user?.avatar"
                    />
                  </RouterLink>
                </div>
                <div class="user-dec">
                  <p class="font-bold">
                    <RouterLink
                      :to="{ path: `/user/${comment.user?._id}` }"
                      class="hover:underline"
                    >
                      {{ comment.user?.nickname }}
                    </RouterLink>
                  </p>
                  <p class="text-xs text-[#9B9893]">
                    {{ dayToNow(comment.createdAt) }}
                  </p>
                  <p class="mt-3">{{ comment.content }}</p>
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

.content {
  white-space: pre-line;
}
</style>
