<script setup>
import MemberArea from '@/components/MemberArea.vue'
import FilterPost from '@/components/FilterPost.vue'
</script>

<template>
  <div>
    <main
      class="px-4 md:px-0 post-list grid grid-cols-5 gap-0 pt-4 lg:pt-[49px]"
    >
      <div
        class="col=start-1 md:col-start-2 col-span-5 md:col-span-2 pr-0 md:pr-6"
      >
        <FilterPost />
      </div>
      <MemberArea class="hidden md:block" />
    </main>
  </div>
</template>
