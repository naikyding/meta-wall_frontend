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
  </form>

  <div class="flex justify-between">
    <RouterLink to="/forgot-password">忘記密碼</RouterLink>
    <RouterLink to="/register">註冊帳號</RouterLink>
  </div>
</template>
