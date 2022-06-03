<script setup>
import LoginForm from './loginForm.vue'
import registerForm from './registerForm.vue'
import forgotPassword from './ForgotPassword.vue'
import resetPassword from './ResetPassword.vue'
import { useLoginStore } from '@/stores/login'
import { onMounted, onUpdated } from 'vue'
import { useRoute } from 'vue-router'

const loginStore = useLoginStore()
const route = useRoute()
const formComponents = [LoginForm, registerForm, forgotPassword, resetPassword]
const checkComponentActive = (routerName) => {
  let activeIndex = 0
  if (routerName === 'register') activeIndex = 1
  else if (routerName === 'forgotPassword') activeIndex = 2
  else if (routerName === 'resetPassword') activeIndex = 3
  else activeIndex = 0
  loginStore.activeComponentIndex = activeIndex
}

onMounted(() => {
  checkComponentActive(route.name)
})

onUpdated(() => {
  checkComponentActive(route.name)
})
</script>

<template>
  <div class="mt-0 flex h-full items-center justify-center py-4 md:py-0">
    <div
      class="items-center border-2 border-black bg-baseBg p-6 shadow-card md:flex lg:p-10"
    >
      <!-- img -->
      <div
        class="img mr-0 hidden h-[200px] w-[300px] bg-[url('/images/main.png')] bg-contain bg-center bg-no-repeat md:block md:h-[341px] lg:mr-12 lg:w-[350px]"
      ></div>
      <!-- 表單 -->
      <div class="input-area text-center">
        <div class="title">
          <a class="logo font-logo text-3xl text-primary md:text-6xl" href="/"
            >MetaWall</a
          >
        </div>
        <component :is="formComponents[loginStore.activeComponentIndex]">
        </component>
        <form id="user-data-form" class="flex"></form>
      </div>
    </div>
  </div>
</template>
