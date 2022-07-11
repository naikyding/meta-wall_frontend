<template>
  <div
    class="post-area mt-4 rounded-lg border-2 border-black bg-white p-8 shadow-post"
  >
    <label>
      貼文內容
      <textarea
        v-model="newPost.form.content"
        class="mt-1 block h-[168px] w-full resize-none border-2 border-black px-4 py-3"
        placeholder="請輸入你的貼文內容"
      >
      </textarea>
    </label>

    <!-- 上傳圖片 -->
    <form enctype="multipart/form-data">
      <label>
        <div
          class="mt-4 inline-block cursor-pointer rounded bg-black px-8 py-1 text-white"
        >
          上傳圖片
        </div>
        <input
          type="file"
          class="hidden"
          accept="image/gif, image/jpeg, image/png"
          @change="newPost.imgPreview($event)"
        />
      </label>
    </form>
    <!-- IMG -->
    <div class="img-area group relative">
      <img
        v-show="newPost.previewImg.url"
        class="mt-4 rounded-lg border-2 border-black"
        :src="newPost.previewImg.url"
        :alt="newPost.previewImg.name"
      />
      <div
        v-show="newPost.previewImg.url"
        @click="newPost.removePreview"
        class="remove-img absolute top-4 left-4 text-center text-white hover:text-secondary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 cursor-pointer drop-shadow-xl"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <!-- 送出貼文 -->
    <div class="submit-area mt-8 text-center">
      <!-- 圖檔超過大小 -->
      <div v-show="newPost.imageOverSize" class="error-area text-error">
        圖片檔案過大，僅限 1mb 以下檔案
      </div>

      <!-- 送出貼文 -->
      <button
        class="mt-4 h-[54px] w-[323px] rounded-lg border-2 border-black px-8 py-1 shadow-base"
        :class="[newPost.submitBtnStatus]"
        @click="newPost.submitPost"
      >
        送出貼文
      </button>
    </div>
  </div>
</template>

<script setup>
import { useNewPostStore } from '@/stores/userPost'
const newPost = useNewPostStore()
</script>
