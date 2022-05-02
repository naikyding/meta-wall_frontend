<script setup>
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'

const appStore = useAppStore()
const userStore = useUserStore()

const dropdownToggle = () => {
  appStore.disableMemberItem = !appStore.disableMemberItem
}
</script>

<template>
  <nav
    class="px-4 md:px-0 menu grid grid-cols-5 gap-0 bg-white h-[60px] fixed top-0 left-0 right-0"
  >
    <ul
      class="font-logo col-start-1 md:col-start-2 col-span-5 md:col-span-3 flex justify-between"
    >
      <li class="my-auto">
        <a href="/" class="text-black text-2xl">MetaWall</a>
      </li>
      <li class="my-auto relative">
        <button class="flex relative" @click="dropdownToggle">
          <div
            class="avatar w-[30px] h-[30px] border-2 rounded-full mr-[10px] overflow-hidden"
          >
            <img
              :src="userStore.data.avatar"
              class="object-cover w-full h-full"
              alt=""
            />
          </div>
          <span class="border-b-2 font-input font-bold">Member</span>
        </button>

        <!-- dropdown -->
        <ul
          v-if="!appStore.disableMemberItem"
          class="control bg-white border-2 border-black w-[180px] text-center absolute top-[35px] right-0 md:left-0"
          @mouseleave="dropdownToggle"
          v-click-away="dropdownToggle"
        >
          <li class="py-2 hover:bg-baseBg">
            <a href="" class="block">我的貼文牆</a>
          </li>
          <li
            class="py-2 hover:bg-baseBg border-y-2 我的貼文牆 修改個人資料 登出"
          >
            <a href="" class="block">修改個人資料</a>
          </li>
          <li class="py-2 hover:bg-baseBg">
            <a href="" class="block">登出</a>
          </li>
          <!-- dropdown shadow -->
          <div
            class="offset-box absolute top-1 bg-white left-1 right-[-8px] bottom-[-8px] z-[-1] border-2 border-black"
          ></div>
        </ul>
      </li>
    </ul>
  </nav>
</template>
