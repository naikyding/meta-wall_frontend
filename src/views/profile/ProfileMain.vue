<script setup>
import { useProfileMainStore } from '@/stores/user'
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
        class="rounded-tl-lg rounded-tr-lg border-2 border-b-0 border-black px-6 py-2"
        :class="profileStore.tabStyle(0)"
        @click="profileStore.activeIndex = 0"
      >
        暱稱修改
      </button>
      <button
        class="rounded-tl-lg rounded-tr-lg border-2 border-b-0 border-black px-6 py-2"
        :class="profileStore.tabStyle(1)"
        @click="profileStore.activeIndex = 1"
      >
        重設密碼
      </button>
    </div>

    <!-- CONTENT -->
    <component
      class="rounded-lg border-2 border-black bg-white py-8 px-6 shadow-post md:px-16 xl:px-[105px]"
      :is="components[profileStore.activeIndex]"
    />
  </div>
</template>
