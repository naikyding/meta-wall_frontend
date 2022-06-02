<script setup>
import LoginForm from './loginForm.vue'
import registerForm from './registerForm.vue'
import forgotPassword from './ForgotPassword.vue'
import { useLoginStore } from '@/stores/login'
import { onMounted, onUpdated } from 'vue'
import { useRoute } from 'vue-router'

const loginStore = useLoginStore()
const route = useRoute()
const formComponents = [LoginForm, registerForm, forgotPassword]
const checkComponentActive = (routerName) => {
  let activeIndex = 0
  if (routerName === '/register') activeIndex = 1
  else if (routerName === '/forgot-password') activeIndex = 2
  else activeIndex = 0
  loginStore.activeComponentIndex = activeIndex
}

onMounted(() => {
  checkComponentActive(route.path)
})

onUpdated(() => {
  checkComponentActive(route.path)
})
</script>

<template>
  <div class="flex justify-center items-center py-4 md:py-0 mt-0 h-full">
    <div
      class="md:flex items-center bg-baseBg p-6 lg:p-10 shadow-card border-2 border-black"
    >
      <!-- img -->
      <div
        class="hidden md:block w-[300px] lg:w-[350px] h-[200px] md:h-[341px] img mr-0 lg:mr-12 bg-[url('/images/main.png')] bg-contain bg-no-repeat bg-center"
      ></div>
      <!-- 表單 -->
      <div class="input-area text-center">
        <div class="title">
          <a class="logo text-primary text-3xl md:text-6xl font-logo" href="/"
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
