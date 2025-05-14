<script setup>
import { ref, provide, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { setLocale } from './i18n';

// 获取i18n实例
const { t, locale } = useI18n();

// 获取当前路由信息
const route = useRoute();
// 计算属性，判断当前是否在3D模型页面
// 返回值: Boolean - 当前页面是否为3D模型页面
const isModel3DPage = computed(() => route.path === '/model');
provide('isModel3DPage', isModel3DPage);
// 监听路由变化，当进入或离开3D模型页面时，添加或移除model-page类
// 参数1: 监听的目标 - 路由路径
// 参数2: 回调函数 - 路由变化时执行
// 参数3: 配置选项 - immediate代表立即执行一次

// 监听路由变化，当在Model3D页面时添加body类
watch(() => route.path, (path) => {
  if (path === '/model') {
    // 在3D模型页面，添加model-page类，启用特殊样式 
    document.body.classList.add('model-page');
  } else {
    // 离开3D模型页面，移除model-page类，恢复默认样式
    document.body.classList.remove('model-page');
  }
}, { immediate: true });

// 切换语言的方法
const toggleLanguage = () => {
  const newLocale = locale.value === 'zh' ? 'en' : 'zh';
  setLocale(newLocale);
};
</script>

<template>
  <div class="app">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="logo">
        <img src="/logo.svg" alt="logo" class="logo-image" /> 
        <span class="logo-text">{{ t('app.title') }}</span>
      </div>
      <!-- 导航链接，使用router-link实现单页应用内部导航 --> 
      <div class="nav-links">
        
        <router-link to="/" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          {{ t('app.nav.home') }}</router-link>
        <router-link to="/algorithm" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          {{ t('app.nav.algorithm') }}</router-link>
        <router-link to="/model" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
            <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
            <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          {{ t('app.nav.model') }}</router-link>
        <router-link to="/data" class="nav-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
          {{ t('app.nav.data') }}</router-link>
        
        <!-- 语言切换按钮 -->
        <button @click="toggleLanguage" class="language-toggle">
          {{ locale === 'zh' ? 'English' : '中文' }}
        </button>
      </div>
    </nav>

    <!-- 主要内容区域，router-view用于显示当前路由对应的组件 -->
    <main class="main-content router-view-container">
      <router-view />
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <p class="footer-copyright">{{ t('app.footer') }}</p>
          <div class="footer-divider"></div>
          <p class="footer-info">{{ t('app.footerAuthor') }}</p>
          <div class="footer-divider"></div>
          <p class="footer-info">{{ t('app.footerContact') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* 全局样式 */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* 主要内容区域样式 */
.router-view-container {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 60px); /* 减去导航栏高度 */
  overflow: auto; /* 内容超出时出现滚动条 */
}

/* 当路径为/model时的特殊样式 */
body.model-page {
  overflow: hidden !important;/* 防止页面滚动 */
}

/* 3D模型页面的导航栏样式 */
body.model-page .navbar {
  background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
  backdrop-filter: blur(5px);/* 背景模糊效果 */
  position: fixed;/* 固定在视口顶部 */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;/* 确保显示在最上层 */
}

body.model-page .footer {
  background-color: rgba(245, 245, 247, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

/* 3D模型页面的主内容区域样式 */
body.model-page .main-content {
  padding: 0;
  margin: 0;
  max-width: 100%;
  width: 100%;
  height: 100vh; /* 占据整个视口高度 */
  overflow: hidden; /* 防止内容超出 */
}

body.model-page .router-view-container {
  height: 100vh; /* 占据整个视口高度 */ 
  overflow: hidden; /* 防止内容超出 */
  margin: 0; /* 移除外边距 */
  padding: 0; /* 移除内边距 */
}

/* 全局样式 */
body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #f9f9f9;
  color: #333;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 导航栏样式 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1000;
}

/* 3D模型页面中的导航栏浮动样式 */
.navbar-floating {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(0.5px);
  -webkit-backdrop-filter: blur(0.5px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.logo {
  font-size: 1.4rem;
  font-weight: 600;
  color: #2c3e50;
  display: flex;
  align-items: center;
}

/* 添加logo图片样式 */
.logo-image {
  height: 28px; /* 调整logo大小 */
  width: auto;
  margin-right: 10px; /* 添加logo与文字间距 */
}

/* 添加logo文字样式 */
.logo-text {
  display: inline-block;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  transition: color 0.3s;
  padding: 0.5rem 0;
  position: relative;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #42b983;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #42b983;
  bottom: 0;
  left: 0;
}

/* 主内容区域 */
.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
}

/* 页脚样式 */
.footer {
  padding: 1.2rem 0;
  text-align: center;
  background-color: #ffffff;
  border-top: none;
  margin-top: auto;
  position: relative;
  z-index: 500;
  font-family: 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
  font-size: 12px;
  color: #86868b;
}

.footer-content {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 980px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.footer-section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 1.5rem;
}

.footer-copyright {
  margin: 0;
  padding: 0 0.8rem;
  font-weight: 400;
}

.footer-info {
  margin: 0;
  padding: 0 0.8rem;
  font-weight: 400;
}

.footer-divider {
  width: 1px;
  height: 16px;
  background-color: #d2d2d7;
}

/* 语言切换按钮样式 */
.language-toggle {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-left: 15px;
}

.language-toggle:hover {
  background-color: #e0e0e0;
  color: #42b983;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    padding: 1rem;
  }

  .nav-links {
    margin-top: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .language-toggle {
    margin-top: 10px;
  }

  .main-content {
    padding: 1rem;
  }

  .footer-section {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .footer-divider {
    width: 40px;
    height: 1px;
    margin: 0.3rem 0;
  }
}
</style>
