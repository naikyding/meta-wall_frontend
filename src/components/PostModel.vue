<script setup>
import { useUserStore } from '../stores/user'
import { day, dayToNow } from '../utils/day'
import { useLikesStore } from '@/stores/likes'
import { useCommentStore } from '@/stores/comments'
import { RouterLink } from 'vue-router'
const userStore = useUserStore()
const likesStore = useLikesStore()
const commentStore = useCommentStore()

const props = defineProps({
  status: {
    type: Boolean,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <!-- overlay -->
  <div
    v-if="props.status"
    class="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
  >
    <div
      class="max-h-[800px] w-[600px] overflow-y-scroll rounded-lg border-2 border-black bg-white shadow-post"
      v-click-away="likesStore.closePostModel"
    >
      <!-- 文章內容 -->
      <div class="w-full rounded-lg bg-white p-6">
        <!-- 貼文者 -->
        <div class="post-user flex items-center">
          <!-- 頭像 -->
          <div class="avatar item h-[45px] w-[45px] overflow-hidden">
            <RouterLink :to="{ path: `/user/${props.data.user._id}` }">
              <img
                class="h-full w-full object-cover"
                :src="props.data.user?.avatar"
                :alt="props.data.user.nickname"
              />
            </RouterLink>
          </div>
          <div class="user-dec">
            <p class="font-bold">
              <RouterLink
                :to="{ path: `/user/${props.data.user._id}` }"
                class="hover:underline"
              >
                {{ props.data.user?.nickname }}
              </RouterLink>
            </p>
            <p class="text-xs text-[#9B9893]">
              {{ day(props.data.createdAt) }}
            </p>
          </div>
        </div>

        <details :class="`details_${props.data._id}`">
          <summary class="cursor-pointer list-none focus:outline-none">
            <!-- 內容 -->
            <div class="content mt-4">
              {{ props.data.content }}
            </div>

            <!-- 圖片 -->
            <div v-show="props.data.image" class="image my-4">
              <img
                class="w-full rounded-lg border-2 border-black"
                :src="props.data.image"
                :alt="props.data.content"
              />
            </div>

            <!-- 操作 -->
            <div class="operate flex">
              <!-- likes -->
              <button
                @click="likesStore.toggleLike({ postId: props.data._id })"
                class="flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1 h-6 w-6"
                  :class="[
                    props.data.likes.includes(userStore.data.id)
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
                  v-show="props.data.likes?.length > 0"
                  class="text-sm text-primary"
                >
                  {{ props.data.likes?.length }}</span
                >
              </button>

              <!-- 留言 -->
              <button class="pointer-events-none mx-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-1 h-6 w-6"
                  :class="[
                    props.data.comments?.length > 0
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span
                  v-show="props.data.comments?.length > 0"
                  class="text-sm text-primary"
                >
                  {{ props.data.comments?.length }}</span
                >
              </button>
            </div>
          </summary>

          <!-- 收折區 -->
          <div>
            <!-- 留言 -->
            <div class="new-post my-[18px] flex items-center">
              <!-- 用戶頭像 -->
              <div
                class="mr-2 h-[45px] w-[45px] overflow-hidden rounded-full border-2 border-black"
              >
                <img
                  :src="userStore.data.avatar"
                  class="h-full w-full object-cover"
                  :alt="userStore.data.nickname"
                />
              </div>
              <!-- input -->
              <div
                class="input-area flex h-[40px] flex-1 border-2 border-black"
              >
                <input
                  type="text"
                  class="w-full px-4 focus:outline-none"
                  placeholder="留言..."
                  v-model.trim="commentStore.form.content"
                />
                <button
                  @click="
                    commentStore.comment({
                      postId: likesStore.activePostId,
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
                v-for="comment in props.data.comments"
                class="comment__item my-4 rounded-lg bg-baseBg/[.4] px-4 py-[18px]"
                :key="comment._id"
              >
                <!-- 貼文者 -->
                <div class="post-user flex">
                  <!-- 頭像 -->
                  <div class="avatar item mr-4 overflow-hidden">
                    <RouterLink :to="{ path: `/user/${comment.user._id}` }">
                      <img
                        :src="comment.user.avatar"
                        class="h-full w-full object-cover"
                        alt=""
                      />
                    </RouterLink>
                  </div>
                  <div class="user-dec">
                    <p class="font-bold">
                      <RouterLink
                        :to="{ path: `/user/${comment.user._id}` }"
                        class="hover:underline"
                      >
                        {{ comment.user.nickname }}
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
  </div>
</template>

<style scoped>
.test {
  color: red;
}
</style>
