<template>
  <div class="zoomable-mermaid" ref="mermaidComponent" :class="{ 'fullscreen': isFullscreen }">
    <div v-if="title" class="mermaid-title">
      <h3>{{ title }}</h3>
      <p v-if="description" class="mermaid-description">{{ description }}</p>
    </div>
    
    <div class="mermaid-wrapper" ref="mermaidWrapper" 
         @mousedown="startDrag" 
         @touchstart="startDrag" 
         @wheel="handleWheel">
      <div class="mermaid" ref="mermaidContainer"></div>
    </div>
    
    <!-- 底部控制按钮，保持原有风格 -->
    <div class="controls-container">
      <div class="controls-wrapper">
        <button @click="zoomIn" class="zoom-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
        <button @click="zoomOut" class="zoom-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
        <button @click="resetZoom" class="zoom-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
        </button>
        <button @click="toggleFullscreen" class="zoom-button fullscreen-button">
          <svg v-if="!isFullscreen" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
            <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
            <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
            <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
            <path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
            <path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
            <path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
          </svg>
        </button>
        <!-- 在全屏模式下显示的退出按钮 -->
        <button v-if="isFullscreen" @click="toggleFullscreen" class="zoom-button exit-button">
          <span>退出全屏 (ESC)</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import mermaid from 'mermaid';

const props = defineProps({
  diagram: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    default: 'default'
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
});

const mermaidContainer = ref(null);
const mermaidWrapper = ref(null);
const mermaidComponent = ref(null);
const scale = ref(0.2);
const offsetX = ref(0);
const offsetY = ref(0);
const dragging = ref(false);
const lastX = ref(0);
const lastY = ref(0);
const isFullscreen = ref(false);

// 初始化mermaid
onMounted(() => {
  // 配置mermaid
  mermaid.initialize({
    startOnLoad: false,
    theme: props.theme,
    flowchart: {
      useMaxWidth: false,
      htmlLabels: true,
      curve: 'basis'
    },
    securityLevel: 'loose'
  });
  
  renderDiagram();
  
  // 监听ESC键退出全屏
  document.addEventListener('keydown', handleKeyDown);
});

// 组件卸载时移除事件监听
const onUnmounted = () => {
  document.removeEventListener('keydown', handleKeyDown);
};

// 处理键盘事件
const handleKeyDown = (event) => {
  if (event.key === 'Escape' && isFullscreen.value) {
    toggleFullscreen();
  }
};

// 全屏切换
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
  
  if (isFullscreen.value) {
    // 保存原始位置，用于恢复
    resetZoom(); // 全屏时重置视图
    document.body.style.overflow = 'hidden'; // 防止滚动
  } else {
    document.body.style.overflow = ''; // 恢复滚动
  }
};

// 渲染图表
const renderDiagram = async () => {
  try {
    if (!mermaidContainer.value) return;
    
    // 清空容器
    mermaidContainer.value.innerHTML = '';
    
    // 不含 YAML 前导的图表定义 - 移除掉配置部分
    let diagramCode = props.diagram.trim();
    if (diagramCode.startsWith('---')) {
      // 移除 YAML 配置部分，因为我们已经用 props.theme 设置了主题
      const secondDelimiterIndex = diagramCode.indexOf('---', 3);
      if (secondDelimiterIndex !== -1) {
        diagramCode = diagramCode.substring(secondDelimiterIndex + 3).trim();
      }
    }
    
    // 添加图表定义
    mermaidContainer.value.textContent = diagramCode;
    
    // 渲染图表
    await mermaid.run({
      nodes: [mermaidContainer.value]
    });
    
    // 初始化缩放和平移属性
    updateTransform();
  } catch (error) {
    console.error('Mermaid渲染失败:', error);
    console.error('错误详情:', error.message);
    console.error('图表内容:', props.diagram);
    
    // 显示错误信息到容器
    if (mermaidContainer.value) {
      mermaidContainer.value.innerHTML = `<div style="color: red; padding: 10px;">
        图表渲染失败: ${error.message}<br>
        请检查图表语法
      </div>`;
    }
  }
};

// 当diagram属性或theme属性变化时重新渲染
watch([() => props.diagram, () => props.theme], () => {
  // 更新mermaid配置
  mermaid.initialize({
    startOnLoad: false,
    theme: props.theme,
    flowchart: {
      useMaxWidth: false,
      htmlLabels: true,
      curve: 'basis'
    },
    securityLevel: 'loose'
  });
  
  renderDiagram();
});

// 更新变换
const updateTransform = () => {
  if (mermaidContainer.value) {
    mermaidContainer.value.style.transform = 
      `translate(${offsetX.value}px, ${offsetY.value}px) scale(${scale.value})`;
    mermaidContainer.value.style.transformOrigin = 'center center';
  }
};

// 开始拖动
const startDrag = (event) => {
  event.preventDefault();
  dragging.value = true;
  
  if (event.type === 'mousedown') {
    lastX.value = event.clientX;
    lastY.value = event.clientY;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  } else if (event.type === 'touchstart') {
    lastX.value = event.touches[0].clientX;
    lastY.value = event.touches[0].clientY;
    
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', stopDrag);
  }
};

// 拖动
const drag = (event) => {
  if (!dragging.value) return;
  
  let currentX, currentY;
  
  if (event.type === 'mousemove') {
    currentX = event.clientX;
    currentY = event.clientY;
  } else if (event.type === 'touchmove') {
    currentX = event.touches[0].clientX;
    currentY = event.touches[0].clientY;
  }
  
  const deltaX = currentX - lastX.value;
  const deltaY = currentY - lastY.value;
  
  offsetX.value += deltaX;
  offsetY.value += deltaY;
  
  lastX.value = currentX;
  lastY.value = currentY;
  
  updateTransform();
};

// 停止拖动
const stopDrag = () => {
  dragging.value = false;
  document.removeEventListener('mousemove', drag);
  document.removeEventListener('mouseup', stopDrag);
  document.removeEventListener('touchmove', drag);
  document.removeEventListener('touchend', stopDrag);
};

// 处理滚轮缩放
const handleWheel = (event) => {
  event.preventDefault();
  
  const delta = -Math.sign(event.deltaY) * 0.1;
  const newScale = Math.max(0.1, Math.min(5, scale.value + delta));
  
  // 计算缩放前鼠标位置相对于容器的偏移量
  const rect = mermaidWrapper.value.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  
  // 计算鼠标位置相对于当前变换中心的偏移量
  const relativeX = mouseX - offsetX.value;
  const relativeY = mouseY - offsetY.value;
  
  // 计算新的偏移量，保持鼠标指向的点不变
  const scaleDiff = newScale / scale.value;
  offsetX.value = mouseX - relativeX * scaleDiff;
  offsetY.value = mouseY - relativeY * scaleDiff;
  
  scale.value = newScale;
  updateTransform();
};

// 放大
const zoomIn = () => {
  const newScale = Math.min(5, scale.value + 0.1);
  scale.value = newScale;
  updateTransform();
};

// 缩小
const zoomOut = () => {
  const newScale = Math.max(0.1, scale.value - 0.1);
  scale.value = newScale;
  updateTransform();
};

// 重置缩放和平移
const resetZoom = () => {
  scale.value = 0.2;
  offsetX.value = 0;
  offsetY.value = 0;
  updateTransform();
};
</script>

<style scoped>
.zoomable-mermaid {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: saturate(180%) blur(20px);
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

/* 全屏样式 */
.zoomable-mermaid.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  border-radius: 0;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: saturate(180%) blur(20px);
  margin: 0;
}

.mermaid-title {
  padding: 10px 15px;
  background-color: rgba(245, 245, 247, 0.7);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.mermaid-title h3 {
  margin: 0 0 5px 0;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: bold;
  font-size: 16px;
  color: #1D1D1F;
}

.fullscreen .mermaid-title h3 {
  font-size: 20px;
}

.mermaid-description {
  margin: 0;
  font-size: 12px;
  color: #86868B;
}

.fullscreen .mermaid-description {
  font-size: 14px;
}

.mermaid-wrapper {
  flex: 1;
  overflow: hidden;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mermaid-wrapper:active {
  cursor: grabbing;
}

.mermaid {
  transform-origin: center center;
  transition: transform 0.05s ease-out;
}

:deep(.mermaid svg) {
  max-width: none !important;
}

/* 控制区域容器 */
.controls-container {
  padding: 10px;
  background-color: rgba(245, 245, 247, 0.7);
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
}

.controls-wrapper {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

/* 保持原有按钮样式 */
.zoom-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #42b983;
  transition: all 0.2s;
}

/* 强制设置SVG图标大小 */
.zoom-button svg {
  min-width: 20px !important;
  min-height: 20px !important;
  width: 20px !important;
  height: 20px !important;
}

/* 强制设置SVG内部元素的样式 */
.zoom-button svg * {
  stroke-width: 2.5 !important;
}

.zoom-button:hover {
  background-color: #f5f5f7;
  transform: scale(1.05);
}

.fullscreen-button {
  color: #007AFF;
}

/* 退出全屏按钮样式 */
.exit-button {
  width: auto;
  border-radius: 20px;
  padding: 0 16px;
  color: #FF3B30;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 13px;
  font-weight: 500;
}

.exit-button:hover {
  background-color: rgba(255, 59, 48, 0.1);
}
</style> 