import { createI18n } from 'vue-i18n'
import en from './en.js'
import zh from './zh.js'

const messages = {
  en,
  zh
}

// 从浏览器语言或本地存储中获取当前语言设置
const getDefaultLocale = () => {
  const savedLocale = localStorage.getItem('smartCommunityLanguage')
  if (savedLocale) {
    return savedLocale
  }
  
  // 从浏览器语言设置中获取首选语言
  const browserLang = navigator.language || navigator.userLanguage
  return browserLang.startsWith('zh') ? 'zh' : 'en'
}

const i18n = createI18n({
  legacy: false, // 使用Composition API模式
  locale: getDefaultLocale(),
  fallbackLocale: 'en', // 默认回退语言为英文
  messages
})

// 提供一个切换语言的方法
export const setLocale = (locale) => {
  i18n.global.locale.value = locale
  localStorage.setItem('smartCommunityLanguage', locale)
  document.querySelector('html').setAttribute('lang', locale)
}

export default i18n
