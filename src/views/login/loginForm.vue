<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="description mb-8 mt-4 text-2xl font-bold">
    到元宇宙展開全新社交圈
  </div>
  <input type="text" class="base-input" placeholder="Email" />
  <input type="password" class="base-input" placeholder="Password" />
  <p class="text-error text-sm mt-8">帳號或密碼錯誤，請重新輸入！</p>

  <button class="base-button">登入</button>
  <RouterLink to="/register">註冊帳號</RouterLink>
</template>
