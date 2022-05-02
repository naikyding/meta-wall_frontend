<script setup>
const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <!-- 沒有貼文 -->
  <div
    v-if="props.list.length < 1"
    class="no-data w-full bg-white border-2 border-black rounded-lg mt-4 shadow-post"
  >
    <div class="bar flex py-5 border-b-2 px-4">
      <div class="dot bg-[#DE4B63]"></div>
      <div class="dot bg-[#FAA722] mx-[6px]"></div>
      <div class="dot bg-[#83C51D]"></div>
    </div>
    <div class="text-center py-8 text-[#9B9893]">
      目前尚無動態，新增一則貼文吧！
    </div>
  </div>

  <!-- 貼文列表 -->
  <div v-else class="have-data shadow-post">
    {{ props.list }}
  </div>
</template>

<style>
.dot {
  @apply h-[9px] w-[9px] rounded-full border-[1px] border-[#707070];
}
</style>
