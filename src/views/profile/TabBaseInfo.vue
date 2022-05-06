<script setup></script>

<template>
  <div>
    <!-- 頭像區 -->
    <div class="avatar-area text-center">
      <div
        class="avatar-area__avatar w-[107px] h-[107px] border-2 border-black rounded-full mx-auto overflow-hidden"
      >
        <img class="object-cover w-full h-full" src="" alt="" />
      </div>
      <button class="avatar-area__upload bg-black text-white px-8 py-1 mt-4">
        上傳大頭照
      </button>
    </div>

    <!-- data -->
    <div class="user-data">
      <label>
        <span>暱稱</span>
        <input type="text" class="base-input mt-1 mb-4" />
      </label>

      <span>性別</span>
      <div>
        <label>
          <input name="sex" type="radio" />
          男性
        </label>

        <label>
          <input name="sex" type="radio" />
          女性
        </label>
      </div>

      <div class="error-area text-error my-4 text-center">
        1.圖片寬高比必需為 1:1，請重新輸入 2. 解析度寬度至少
        300像素以上，請重新輸入
      </div>

      <button class="base-button font-bold h-[54px]">送出更新</button>
    </div>
  </div>
</template>
