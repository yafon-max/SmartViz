// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import path from 'path'

export default defineConfig({
  base: './',                // 确保生产环境下资源引用相对路径
  plugins: [
    vue(),
    vueI18n({
      // 指向你所有语言文件的文件夹
      include: path.resolve(__dirname, './src/i18n/**')
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
