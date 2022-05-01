<template>
  <div class="description mb-8 mt-4 text-2xl font-bold">註冊</div>
  <input type="text" class="base-input" placeholder="暱稱" />
  <p class="text-error text-left text-sm">暱稱至少 2 個字元以上</p>
  <input type="text" class="base-input" placeholder="Email" />
  <p class="text-error text-left text-sm">帳號已被註冊，請替換新的 Email！</p>
  <input type="password" class="base-input" placeholder="Password" />
  <p class="text-error text-left text-sm">密碼需至少 8 碼以上，並中英混合</p>

  <button class="base-button">註冊</button>
  <RouterLink to="/login">登入</RouterLink>
</template>

<script setup></script>
