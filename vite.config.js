import { fileURLToPath, URL } from 'url'
import StylelintPlugin from 'vite-plugin-stylelint'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    StylelintPlugin({
      fix: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // 開發端口
    port: 8080,
  },
})
