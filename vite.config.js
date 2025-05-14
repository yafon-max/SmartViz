import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'i18n-en': ['./src/i18n/locales/en/app.js', './src/i18n/locales/en/home.js', './src/i18n/locales/en/dataViz.js', './src/i18n/locales/en/algorithm.js', './src/i18n/locales/en/model3d.js'],
          'i18n-zh': ['./src/i18n/locales/zh/app.js', './src/i18n/locales/zh/home.js', './src/i18n/locales/zh/dataViz.js', './src/i18n/locales/zh/algorithm.js', './src/i18n/locales/zh/model3d.js']
        }
      }
    },
    chunkSizeWarningLimit: 1500
  }
})