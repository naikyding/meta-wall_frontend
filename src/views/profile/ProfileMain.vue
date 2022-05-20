<script setup>
import { useProfileMainStore } from '@/stores/profile'
import BaseInfo from './TabBaseInfo.vue'
import Password from './TabPassword.vue'

const profileStore = useProfileMainStore()
const components = [BaseInfo, Password]
</script>

<template>
  <div class="mt-[27px]">
    <!-- TAB -->
    <div class="tab px-4">
      <button
        class="rounded-tl-lg rounded-tr-lg px-6 py-2 border-2 border-b-0 border-black"
        :class="profileStore.tabStyle(0)"
        @click="profileStore.activeIndex = 0"
      >
        暱稱修改
      </button>
      <button
        class="rounded-tl-lg rounded-tr-lg px-6 py-2 border-2 border-b-0 border-black"
        :class="profileStore.tabStyle(1)"
        @click="profileStore.activeIndex = 1"
      >
        重設密碼
      </button>
    </div>

    <!-- CONTENT -->
    <component
      class="border-2 border-black bg-white rounded-lg py-8 px-6 md:px-16 xl:px-[105px] shadow-post"
      :is="components[profileStore.activeIndex]"
    />
  </div>
</template>
