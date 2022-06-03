<template>
  <div
    class="description md-4 mt-2 text-lg font-bold md:mb-8 md:mt-4 md:text-2xl"
  >
    忘記密碼
  </div>
  <form>
    <!-- Email -->
    <input
      v-model.trim="forgotPasswordStore.form.email"
      type="email"
      class="base-input"
      placeholder="請輸入 Email"
      @blur.once="forgotPasswordStore.inputStatus.email = true"
    />
    <p class="h-5 text-left text-sm text-error">
      <span v-show="forgotPasswordStore.rules.email.required">
        這是必填欄位
      </span>
      <span v-show="forgotPasswordStore.rules.email.validate">
        不符合電子信箱格式
      </span>
    </p>
    <button
      @click="forgotPasswordStore.submit(forgotPasswordStore.form)"
      type="button"
      class="base-button"
    >
      確認
    </button>
  </form>

  <RouterLink to="/login">登入</RouterLink>
</template>

<script setup>
import { useForgotPasswordStore } from '@/stores/forgotPassword'
const forgotPasswordStore = useForgotPasswordStore()
</script>
