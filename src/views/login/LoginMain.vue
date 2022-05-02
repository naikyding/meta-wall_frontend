<script setup>
import LoginForm from './loginForm.vue'
import registerForm from './registerForm.vue'
import { useLoginStore } from '@/stores/login'
import { onMounted, onUpdated } from 'vue'
import { useRoute } from 'vue-router'

const loginStore = useLoginStore()
const route = useRoute()
const formComponents = [LoginForm, registerForm]
const checkComponentActive = (routerName) => {
  loginStore.activeComponentIndex = routerName === '/register' ? 1 : 0
}

onMounted(() => {
  checkComponentActive(route.path)
})

onUpdated(() => {
  checkComponentActive(route.path)
})
</script>

<template>
  <div class="flex justify-center items-center h-full mt-0">
    <div
      class="md:flex items-center bg-baseBg p-10 shadow-card border-2 border-black"
    >
      <!-- img -->
      <div
        class="w-[350px] h-[341px] img mr-12 bg-[url('/images/main.png')] bg-cover"
      ></div>
      <!-- 表單 -->
      <div class="input-area text-center">
        <div class="title">
          <a class="logo text-primary text-6xl font-logo" href="/">MetaWall</a>
        </div>
        <component :is="formComponents[loginStore.activeComponentIndex]">
        </component>
        <form id="user-data-form" class="flex"></form>
      </div>
    </div>
  </div>
</template>
