import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n, { loadLanguageAsync } from './i18n'
import './style.css'

// 创建应用
const app = createApp(App)

// 注册插件
app.use(router)
app.use(i18n)

// 添加加载指示器
app.config.globalProperties.$loading = true

// 确保语言包加载完成再挂载应用
loadLanguageAsync().then(() => {
  app.config.globalProperties.$loading = false
  app.mount('#app')
})
