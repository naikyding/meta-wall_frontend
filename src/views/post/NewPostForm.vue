<template>
  <div
    class="post-area border-2 border-black bg-white rounded-lg mt-4 p-8 shadow-post"
  >
    <label>
      貼文內容
      <textarea
        v-model="newPost.form.content"
        class="block border-2 border-black w-full h-[168px] resize-none px-4 py-3 mt-1"
        placeholder="請輸入你的貼文內容"
      >
      </textarea>
    </label>

    <!-- 上傳圖片 -->
    <form enctype="multipart/form-data">
      <label>
        <div
          class="rounded inline-block cursor-pointer bg-black text-white px-8 py-1 mt-4"
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
    <div class="img-area relative group">
      <img
        v-show="newPost.previewImg.url"
        class="border-2 border-black rounded-lg mt-4"
        :src="newPost.previewImg.url"
        :alt="newPost.previewImg.name"
      />
      <div
        v-show="newPost.previewImg.url"
        @click="newPost.removePreview"
        class="text-center text-white hover:text-secondary remove-img absolute top-4 left-4"
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
    <div class="submit-area text-center mt-8">
      <!-- 圖檔超過大小 -->
      <div v-show="newPost.imageOverSize" class="error-area text-error">
        圖片檔案過大，僅限 1mb 以下檔案
      </div>

      <!-- 送出貼文 -->
      <button
        class="rounded-lg h-[54px] w-[323px] px-8 py-1 mt-4 border-2 border-black shadow-base"
        :class="[newPost.submitBtnStatus]"
        @click="newPost.submitPost"
      >
        送出貼文
      </button>
    </div>
  </div>
</template>

<script setup>
import { useNewPostStore } from '@/stores/newPost'
const newPost = useNewPostStore()
</script>
