<script setup></script>

<template>
  <div>
    <label>
      <span>請輸入新密碼</span>
      <input
        type="text"
        class="base-input mt-1 mb-4"
        placeholder="請輸入新密碼"
      />
    </label>

    <label>
      <span class="">再次請輸入</span>
      <input type="text" class="base-input mt-1" placeholder="再次輸入新密碼" />
    </label>

    <div class="error-area text-error my-4 text-center">輸入錯誤 @!#$@#!</div>

    <button
      class="block w-full bg-[#A8B0B9] rounded-lg py-4 text-white border-2 border-[#808080] mt-8 font-bold"
    >
      重設密碼
    </button>
  </div>
</template>
