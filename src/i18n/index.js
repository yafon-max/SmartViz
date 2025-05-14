import { createI18n } from 'vue-i18n'
import en from './en.js'
import zh from './zh.js'

const messages = {
  en,
  zh
}

// 从浏览器语言或本地存储中获取当前语言设置
const getDefaultLocale = () => {
  // 检查是否在浏览器环境中，以及 localStorage 是否可用
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedLocale = localStorage.getItem('smartCommunityLanguage');
    if (savedLocale) {
      return savedLocale;
    }
  }
  
  // 检查是否在浏览器环境中，以及 navigator.language 是否可用
  if (typeof navigator !== 'undefined' && navigator.language) {
    // userLanguage 是为旧版IE准备的
    const browserLang = navigator.language || navigator.userLanguage;
    // 将浏览器语言代码统一转为小写进行比较，例如 'zh-CN' -> 'zh'
    return browserLang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
  }
  
  // 如果无法从 localStorage 或 navigator 获取，则返回一个默认值
  // 考虑到您的应用似乎以中文为主要展示，可以将 'zh' 作为首选默认值
  // 如果您希望默认是英文，可以改为 'en'
  return 'zh'; 
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
