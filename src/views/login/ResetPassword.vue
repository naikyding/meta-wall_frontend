<template>
  <div
    class="description md-4 mt-2 text-lg font-bold md:mb-8 md:mt-4 md:text-2xl"
  >
    重置密碼
  </div>
  <div>
    <label>
      <input
        v-model.trim="userPassword.form.password"
        type="password"
        class="base-input mt-1 mb-4"
        placeholder="請輸入新密碼"
      />
    </label>

    <label>
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
      @click="
        userPassword.resetPassword({
          password: userPassword.form.password,
          passwordConfirm: userPassword.form.passwordConfirm,
          userId: $route.params.userId,
          token: route.params.token,
        })
      "
      :class="
        userPassword.formValidateStatus ? 'base-button' : 'base-button-disabled'
      "
    >
      重設密碼
    </button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useUserPassword } from '../../stores/user'
const userPassword = useUserPassword()
const route = useRoute()
</script>
