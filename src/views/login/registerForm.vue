<template>
  <div
    class="description md-4 md:mb-8 mt-2 md:mt-4 text-lg md:text-2xl font-bold"
  >
    註冊
  </div>
  <form>
    <!-- 暱稱 -->
    <input
      v-model.trim="userRegisterStore.form.nickname"
      type="text"
      class="base-input"
      placeholder="暱稱"
      @blur.once="userRegisterStore.formStatus.nickname = true"
    />
    <p class="text-error text-left text-sm h-5">
      <span v-show="userRegisterStore.rules.nickname.required">
        這是必填欄位
      </span>
      <span v-show="!userRegisterStore.rules.nickname.length">
        暱稱至少 2 個字元以上
      </span>
    </p>

    <!-- Email -->
    <input
      v-model.trim="userRegisterStore.form.email"
      type="email"
      class="base-input"
      placeholder="Email"
      @blur.once="userRegisterStore.formStatus.email = true"
    />
    <p class="text-error text-left text-sm h-5">
      <span v-show="userRegisterStore.rules.email.required">
        這是必填欄位
      </span>

      <span v-show="userRegisterStore.rules.email.validate">
        不符合電子信箱格式
      </span>
    </p>

    <!-- Password -->
    <input
      v-model.trim="userRegisterStore.form.password"
      type="password"
      class="base-input"
      placeholder="Password"
      @blur.once="userRegisterStore.formStatus.password = true"
    />
    <p class="text-error text-left text-sm h-5">
      <span v-show="userRegisterStore.rules.password.required">
        這是必填欄位
      </span>
      <span v-show="userRegisterStore.rules.password.length">
        密碼需至少 8 碼以上
      </span>
    </p>

    <!-- 確認密碼 Password -->
    <input
      v-model.trim="userRegisterStore.form.passwordConfirm"
      type="password"
      class="base-input"
      placeholder="確認密碼"
      @blur.once="userRegisterStore.formStatus.passwordConfirm = true"
    />
    <p class="text-error text-left text-sm h-5">
      <span v-show="userRegisterStore.rules.passwordConfirm.required">
        這是必填欄位
      </span>
      <span
        v-show="
          userRegisterStore.formStatus.passwordConfirm &&
          !userRegisterStore.rules.passwordConfirm.same
        "
      >
        密碼必須一致
      </span>
    </p>

    <button
      type="submit"
      @click="userRegisterStore.register(userRegisterStore.form)"
      class="base-button"
    >
      註冊
    </button>
  </form>

  <RouterLink to="/login">登入</RouterLink>
</template>

<script setup>
import { userUserRegister } from '@/stores/user'

const userRegisterStore = userUserRegister()
</script>
