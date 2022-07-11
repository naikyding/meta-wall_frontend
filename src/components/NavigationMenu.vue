<script setup>
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { RouterLink } from 'vue-router'

const appStore = useAppStore()
const userStore = useUserStore()

const dropdownToggle = () => {
  appStore.disableMemberItem = !appStore.disableMemberItem
}
</script>

<template>
  <nav
    class="menu fixed top-0 left-0 right-0 grid h-[60px] grid-cols-5 gap-0 border-b-[3px] border-black bg-white px-4 md:px-12 lg:px-0"
  >
    <ul
      class="col-span-5 col-start-1 flex justify-between lg:col-span-3 lg:col-start-2"
    >
      <li class="my-auto">
        <a href="/" class="font-logo text-2xl font-[900]">MetaWall</a>
      </li>
      <li class="relative my-auto">
        <button class="relative flex" @click="dropdownToggle">
          <div
            class="avatar mr-[10px] h-[30px] w-[30px] overflow-hidden rounded-full border-2"
          >
            <img
              :src="userStore.data.avatar"
              class="h-full w-full object-cover"
              alt=""
            />
          </div>
          <span class="border-b-2 font-input font-bold">Member</span>
        </button>

        <!-- dropdown -->
        <ul
          v-if="!appStore.disableMemberItem"
          class="control absolute top-[35px] right-0 w-[180px] border-2 border-black bg-white text-center md:left-0"
          @mouseleave="dropdownToggle"
          v-click-away="dropdownToggle"
        >
          <li class="py-2 hover:bg-baseBg">
            <RouterLink
              :to="{
                path: `/user/${userStore.data.id ? userStore.data.id : ' '}`,
              }"
              class="block"
              >我的貼文牆</RouterLink
            >
          </li>
          <li class="border-y-2 py-2 hover:bg-baseBg">
            <RouterLink :to="{ path: '/profile' }" class="block"
              >修改個人資料</RouterLink
            >
          </li>
          <li class="py-2 hover:bg-baseBg">
            <a @click="userStore.logout" href="javascript:;" class="block"
              >登出</a
            >
          </li>
          <!-- dropdown shadow -->
          <div
            class="offset-box absolute top-1 left-1 right-[-8px] bottom-[-8px] z-[-1] border-2 border-black bg-white"
          ></div>
        </ul>
      </li>
    </ul>
  </nav>
</template>
