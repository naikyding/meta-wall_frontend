<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { useLoginStore } from '@/stores/user'
import request from '../../api/request'
import { useProfileStore } from '../../stores/user'
import router from '../../router'

const loginStore = useLoginStore()
const userProfileStore = useProfileStore()
const route = useRoute()
const jwtToken = route.query.token

if (jwtToken) {
  const token = `Bearer ${jwtToken}`
  localStorage.setItem('token', token)
  request.defaults.headers.common['Authorization'] = token
  userProfileStore.getUserProfile()
  router.replace({ path: '/' })
}
</script>

<template>
  <div class="description mb-8 mt-4 text-2xl font-bold">
    到元宇宙展開全新社交圈
  </div>
  <form>
    <!-- EMAIL -->
    <input
      v-model.trim="loginStore.form.email"
      type="text"
      class="base-input mb-5"
      placeholder="Email"
      required
    />

    <!-- 密碼 -->
    <input
      v-model.trim="loginStore.form.password"
      type="password"
      class="base-input"
      placeholder="Password"
      @keydown.enter="loginStore.userLogin(loginStore.form)"
    />

    <p class="h-4 text-sm text-error">
      <span v-show="loginStore.loginError">
        {{ loginStore.loginError || '登入錯誤，請重試' }}
      </span>
    </p>

    <button
      type="button"
      class="base-button"
      @click="loginStore.userLogin(loginStore.form)"
    >
      登入
    </button>

    <!-- google -->
    <button
      @click="loginStore.googleAuth"
      type="button"
      class="d-flex mb-4 w-full justify-center rounded-lg border-2 border-black py-1 text-black hover:bg-secondary"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ionicon inline-block h-[30px] w-[30px]"
        viewBox="0 0 512 512"
      >
        <title>Logo Google</title>
        <path
          d="M473.16 221.48l-2.26-9.59H262.46v88.22H387c-12.93 61.4-72.93 93.72-121.94 93.72-35.66 0-73.25-15-98.13-39.11a140.08 140.08 0 01-41.8-98.88c0-37.16 16.7-74.33 41-98.78s61-38.13 97.49-38.13c41.79 0 71.74 22.19 82.94 32.31l62.69-62.36C390.86 72.72 340.34 32 261.6 32c-60.75 0-119 23.27-161.58 65.71C58 139.5 36.25 199.93 36.25 256s20.58 113.48 61.3 155.6c43.51 44.92 105.13 68.4 168.58 68.4 57.73 0 112.45-22.62 151.45-63.66 38.34-40.4 58.17-96.3 58.17-154.9 0-24.67-2.48-39.32-2.59-39.96z"
        />
      </svg>
      Sign in with Google
    </button>

    <!-- facebook -->
    <button
      @click="loginStore.facebookAuth"
      type="button"
      class="d-flex mb-4 w-full justify-center rounded-lg border-2 border-black py-1 text-black hover:bg-secondary"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="bi bi-facebook inline-block h-[30px] w-[30px]"
        viewBox="0 0 16 16"
      >
        <path
          d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
        />
      </svg>
      Sign in with Facebook
    </button>
  </form>

  <div class="flex justify-between">
    <RouterLink to="/forgot-password">忘記密碼</RouterLink>
    <RouterLink to="/register">註冊帳號</RouterLink>
  </div>
</template>
