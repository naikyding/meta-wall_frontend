<script setup>
import { useUserPassword } from '../../stores/user'
const userPassword = useUserPassword()
</script>

<template>
  <div>
    <label>
      <span>請輸入新密碼</span>
      <input
        v-model.trim="userPassword.form.password"
        type="password"
        class="base-input mt-1 mb-4"
        placeholder="請輸入新密碼"
      />
    </label>

    <label>
      <span class="">再次請輸入</span>
      <input
        v-model.trim="userPassword.form.passwordConfirm"
        type="password"
        class="base-input mt-1"
        placeholder="再次輸入新密碼"
      />
    </label>

    <div class="error-area my-4 h-5 text-center text-error">
      <span v-show="userPassword.error.status">
        {{ userPassword.error.message }}
      </span>
    </div>

    <button
      @click="userPassword.updatePassword(userPassword.form)"
      :class="
        userPassword.formValidateStatus ? 'base-button' : 'base-button-disabled'
      "
    >
      重設密碼
    </button>
  </div>
</template>
