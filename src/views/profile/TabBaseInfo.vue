<script setup>
import { useProfileStore } from '@/stores/user'
const userProfile = useProfileStore()

userProfile.getUserProfile()
</script>

<template>
  <div>
    <!-- 頭像區 -->
    <div class="avatar-area text-center">
      <div
        class="avatar-area__avatar mb-5 w-[107px] h-[107px] border-2 border-black rounded-full mx-auto overflow-hidden"
      >
        <img
          class="object-cover w-full h-full"
          :src="userProfile.form.avatar"
          :alt="userProfile.form.nickname"
        />
      </div>

      <label
        class="avatar-area__upload bg-black text-white py-2 px-8 cursor-pointer"
      >
        <input
          @change="userProfile.avatarImagePreview"
          type="file"
          name="avatar"
          hidden
        />
        上傳大頭照
      </label>
    </div>

    <!-- data -->
    <div class="user-data mt-4">
      <label>
        <span>暱稱</span>
        <input
          type="text"
          class="base-input mt-1 mb-4"
          v-model="userProfile.form.nickname"
        />
      </label>

      <span>性別</span>
      <div>
        <label>
          <input
            v-model="userProfile.form.gender"
            name="sex"
            type="radio"
            value="male"
          />
          男性
        </label>

        <label>
          <input
            v-model="userProfile.form.gender"
            name="sex"
            type="radio"
            value="female"
          />
          女性
        </label>
      </div>

      <div class="error-area text-error my-4 text-center h-5">
        <span v-show="userProfile.error.required">請完善個人資料</span>

        <span v-show="false">
          1.圖片寬高比必需為 1:1，請重新輸入 2. 解析度寬度至少
          300像素以上，請重新輸入
        </span>
      </div>

      <button
        @click="userProfile.updateUserProfile(userProfile.form)"
        class="base-button font-bold h-[54px]"
      >
        送出更新
      </button>
    </div>
  </div>
</template>
