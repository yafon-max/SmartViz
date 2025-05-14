import { createI18n } from 'vue-i18n'

const getDefaultLocale = () => {
  const savedLocale = localStorage.getItem('smartCommunityLanguage')
  if (savedLocale) {
    return savedLocale
  }
  const browserLang = navigator.language || navigator.userLanguage
  return browserLang.startsWith('zh') ? 'zh' : 'en'
}

// 预先导入所有语言模块以确保构建时包含
const modules = {
  en: {
    app: () => import('./locales/en/app.js'),
    home: () => import('./locales/en/home.js'),
    dataViz: () => import('./locales/en/dataViz.js'),
    algorithm: () => import('./locales/en/algorithm.js'),
    model3d: () => import('./locales/en/model3d.js')
  },
  zh: {
    app: () => import('./locales/zh/app.js'),
    home: () => import('./locales/zh/home.js'),
    dataViz: () => import('./locales/zh/dataViz.js'),
    algorithm: () => import('./locales/zh/algorithm.js'),
    model3d: () => import('./locales/zh/model3d.js')
  }
}

const i18n = createI18n({
  legacy: false,
  locale: getDefaultLocale(),
  fallbackLocale: 'en',
  messages: {}
})

export const loadLanguageAsync = async (locale = getDefaultLocale()) => {
  try {
    // 确保locale是有效的
    const targetLocale = ['en', 'zh'].includes(locale) ? locale : 'en'
    
    // 加载该语言的所有模块
    const loadedModules = await Promise.all(
      Object.entries(modules[targetLocale]).map(async ([key, importFn]) => {
        const module = await importFn()
        return { key, messages: module.default }
      })
    )
    
    // 构建合并后的消息对象
    const messages = {}
    loadedModules.forEach(({ key, messages: moduleMessages }) => {
      messages[key] = moduleMessages
    })
    
    // 设置消息
    i18n.global.locale.value = targetLocale
    i18n.global.setLocaleMessage(targetLocale, messages)
    
    // 保存设置
    localStorage.setItem('smartCommunityLanguage', targetLocale)
    document.querySelector('html')?.setAttribute('lang', targetLocale)
    
    return targetLocale
  } catch (error) {
    console.error(`加载语言包错误:`, error)
    return locale
  }
}

// 初始化加载默认语言
setTimeout(() => {
  loadLanguageAsync()
}, 0)

export const setLocale = loadLanguageAsync

export default i18n
