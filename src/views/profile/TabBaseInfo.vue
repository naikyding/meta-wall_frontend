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
        class="avatar-area__avatar mx-auto mb-5 h-[107px] w-[107px] overflow-hidden rounded-full border-2 border-black"
      >
        <img
          class="h-full w-full object-cover"
          :src="userProfile.form.avatar"
          :alt="userProfile.form.nickname"
        />
      </div>

      <label
        class="avatar-area__upload cursor-pointer bg-black py-2 px-8 text-white"
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

      <div class="error-area my-4 h-5 text-center text-error">
        <span v-show="userProfile.error.required">請完善個人資料</span>

        <span v-show="false"> 圖片寬高比必需為 1:1，請重新輸入 </span>
      </div>

      <button
        @click="userProfile.updateUserProfile(userProfile.form)"
        :class="
          userProfile.formValidateStatus
            ? 'base-button'
            : 'base-button-disabled'
        "
      >
        送出更新
      </button>
    </div>
  </div>
</template>
