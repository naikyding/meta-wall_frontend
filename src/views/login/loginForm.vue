<script setup>
import { RouterLink } from 'vue-router'
import { useLoginStore } from '@/stores/user'
const loginStore = useLoginStore()
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

    <p class="text-error text-sm h-4">
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

  <RouterLink to="/register">註冊帳號</RouterLink>
</template>
