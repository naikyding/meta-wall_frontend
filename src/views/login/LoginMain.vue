<script setup>
import LoginForm from './loginForm.vue'
import registerForm from './registerForm.vue'
import { useLoginStore } from '@/stores/login'
import { onMounted, onUpdated } from 'vue'
import { useRoute } from 'vue-router'

const loginStore = useLoginStore()
const route = useRoute()
const formComponents = [LoginForm, registerForm]

onMounted(() => {
  loginStore.activeComponentIndex = route.path === '/register' ? 1 : 0
})

onUpdated(() => {
  loginStore.activeComponentIndex = route.path === '/register' ? 1 : 0
})
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div
      class="md:flex items-center bg-baseBg p-10 shadow-card border-2 border-black"
    >
      <!-- img -->
      <div
        class="w-[350px] h-[341px] img mr-12 bg-[url('/images/main.png')] bg-cover"
      ></div>
      <!-- 表單 -->
      <div class="input-area text-center">
        <div class="logo text-primary text-6xl font-logo title">MetaWall</div>
        <component :is="formComponents[loginStore.activeComponentIndex]">
        </component>
        <form id="user-data-form" class="flex"></form>
      </div>
    </div>
  </div>
</template>
