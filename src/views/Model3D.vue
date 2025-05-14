<template>
  <!-- 整体容器：3D模型展示页面的顶层容器 -->
  <div class="model-3d">
    <!-- 主容器：包含所有面板和3D画布 -->
    <div class="main-container">
      <!-- 左侧控制面板：包含各种控制选项 -->
      <div class="left-panel">
        <!-- 图层控制面板：控制不同图层的显示/隐藏 -->
        <div class="mac-panel panel-section">
          <h3 class="panel-title">{{ t('model3d.panels.layerControl.title') }}</h3>
          <div class="info-content">
            <div class="layer-controls">
            <!-- 添加的模型加载进度条显示 - 仅在加载大型模型时显示 -->
            <div v-if="modelLoading.isLoading" class="loading-progress">
              <div class="loading-text">{{ t('model3d.loading.text', '正在加载') + ': ' + modelLoading.model + t('model3d.loading.notice', '3D模型') }}

              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{width: modelLoading.progress + '%'}"></div>
              </div>
              <div class="progress-text">{{ modelLoading.progress.toFixed(1) + '%' }}</div>
            </div>
            
            <!-- 建筑物图层控制 -->
            <div class="layer-item">
              <!-- v-model双向绑定layers.buildings，当复选框状态改变时触发toggleLayer函数 -->
              <input type="checkbox" id="buildingLayer" v-model="layers.buildings" @change="toggleLayer('buildings')">
              <label for="buildingLayer">{{ t('model3d.panels.layerControl.buildings') }}</label>
            </div>
            <!-- 道路图层控制
            <div class="layer-item">
              <input type="checkbox" id="roadLayer" v-model="layers.roads" @change="toggleLayer('roads')">
              <label for="roadLayer">{{ t('model3d.panels.layerControl.roads') }}</label>
            </div> -->
            <!-- 摄像头位置图层控制 -->
            <div class="layer-item">
              <input type="checkbox" id="cameraLayer" v-model="layers.cameras" @change="toggleLayer('cameras')">
              <label for="cameraLayer">{{ t('model3d.panels.layerControl.cameras') }}</label>
            </div>
            <!-- 摄像头视线线段图层控制 -->
            <div class="layer-item">
              <input type="checkbox" id="visionLinesLayer" v-model="layers.visionLines" @change="toggleLayer('visionLines')">
              <label for="visionLinesLayer">{{ t('model3d.panels.layerControl.visionLines') }}</label>
            </div>
            <!-- 摄像头视野平面图层控制 -->
            <div class="layer-item">
              <input type="checkbox" id="visionPlaneLayer" v-model="layers.visionPlane" @change="toggleLayer('visionPlane')">
              <label for="visionPlaneLayer">{{ t('model3d.panels.layerControl.visionPlane') }}</label>
            </div>
            <!-- 数据热点图层控制 -->
            <div class="layer-item">
              <input type="checkbox" id="dataLayer" v-model="layers.data" @change="toggleLayer('data')">
              <label for="dataLayer">{{ t('model3d.panels.layerControl.data') }}</label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 视角控制面板：管理3D场景的视角 -->
        <div class="mac-panel panel-section">
          <h3 class="panel-title">{{ t('model3d.panels.viewControl.title') }}</h3>
          <div class="view-controls">
            <!-- 重置视角按钮：点击时调用resetView函数 -->
            <button @click="resetView" class="mac-button control-btn">
              <span class="icon">⟲</span> {{ t('model3d.panels.viewControl.resetView') }}
            </button>
            <!-- 切换线框模式：点击时调用toggleWireframe函数，文本根据isWireframe状态变化 -->
            <button @click="toggleWireframe" class="mac-button control-btn">
              <span class="icon">⊞</span> {{ isWireframe ? t('model3d.panels.viewControl.wireframeOff') : t('model3d.panels.viewControl.wireframeOn') }}
            </button>
          </div>
        </div>
        
        <!-- 数据显示控制面板：选择要显示的数据类型 -->
        <div class="mac-panel panel-section">
          <h3 class="panel-title">{{ t('model3d.panels.dataDisplay.title') }}</h3>
          <div class="data-select">
            <!-- 数据类型选择器：v-model绑定selectedData，改变时触发updateDataVisualization函数 -->
            <select v-model="selectedData" @change="updateDataVisualization" class="mac-select">
              <option value="none">{{ t('model3d.panels.dataDisplay.noData') }}</option>
              <option value="pedestrian">{{ t('model3d.panels.dataDisplay.pedestrian') }}</option>
              <option value="vehicle">{{ t('model3d.panels.dataDisplay.vehicle') }}</option>
              <option value="combined">{{ t('model3d.panels.dataDisplay.combined') }}</option>
            </select>
          </div>
        </div>
        
        <!-- 时间选择面板：控制数据展示的时间点 -->
        <div class="mac-panel panel-section">
          <h3 class="panel-title">{{ t('model3d.panels.timeSelect.title') }}</h3>
          <!-- 时间滑块：控制一天中的小时 (0-23) -->
          <div class="time-slider">
            <input 
              type="range" 
              min="0" 
              max="23" 
              v-model="currentHour" 
              @input="updateTimeBasedData"
              class="mac-slider"
            >
            <!-- 显示当前选中的时间 -->
            <div class="time-display">{{ formatHour(currentHour) }}</div>
          </div>
          <!-- 日期类型选择：工作日/休息日 -->
          <div class="day-select">
            <!-- active类根据dayType的值动态添加 -->
            <button @click="setDayType('workday')" :class="{ active: dayType === 'workday' }" class="mac-button">{{ t('model3d.panels.timeSelect.workday') }}</button>
            <button @click="setDayType('weekend')" :class="{ active: dayType === 'weekend' }" class="mac-button">{{ t('model3d.panels.timeSelect.weekend') }}</button>
          </div>
        </div>
        
        <!-- 使用说明面板：帮助用户了解操作方式 -->
        <div class="mac-panel panel-section info-section">
          <h3 class="panel-title">{{ t('model3d.panels.instructions.title') }}</h3>
          <ul class="instruction-list">
            <li>{{ t('model3d.panels.instructions.rotate') }}</li>
            <li>{{ t('model3d.panels.instructions.pan') }}</li>
            <li>{{ t('model3d.panels.instructions.zoom') }}</li>
            <li>{{ t('model3d.panels.instructions.click') }}</li>
          </ul>
        </div>
      </div>
      
      <!-- 中间3D模型展示区：Three.js渲染的主要区域 -->
      <div class="model-canvas-container">
        <!-- ref="modelCanvas"引用DOM元素，用于Three.js初始化 -->
        <div ref="modelCanvas" class="model-canvas"></div>
      </div>
      
      <!-- 右侧数据面板：显示选中对象的详细信息和数据图表 -->
      <div class="right-panel">
        <!-- 信息面板：显示选中对象的详细信息 --> 
        <div class="mac-panel panel-section">
          <h3 class="panel-title">{{ t('model3d.panels.infoPanel.title') }}</h3>
          <!-- 当有选中的对象时显示 -->
          <div class="info-content" v-if="selectedObject">
            <!-- 对象标题区域 -->
            <div class="object-info-header">
              <!-- 根据对象类型设置不同颜色的图标 -->
              <span class="object-icon" :class="selectedObject.type">●</span>
              <h4>{{ selectedObject.name }}</h4>
            </div>
            <!-- 对象详细信息区域 -->
            <div class="object-info-body">
              <p><strong>{{ t('model3d.panels.infoPanel.type') }}：</strong> {{ getTypeDisplayName(selectedObject.type) }}</p>
              <!-- 条件渲染：只有当对象有position属性时才显示位置信息 -->
              <p v-if="selectedObject.position"><strong>{{ t('model3d.panels.infoPanel.position') }}：</strong>{{ formatPosition(selectedObject.position, selectedObject.id, selectedObject.type) }}</p>
              <!-- 摄像头特有信息：在线状态 -->
              <p v-if="selectedObject.type === 'camera'">
                <strong>{{ t('model3d.panels.infoPanel.status') }}：</strong> <span :class="selectedObject.status ? 'status-online' : 'status-offline'">{{ selectedObject.status ? t('model3d.panels.infoPanel.online') : t('model3d.panels.infoPanel.offline') }}</span>
              </p>
              <!-- 数据节点特有信息：数值 -->
              <p v-if="selectedObject.type === 'data'">
                <strong>{{ t('model3d.panels.infoPanel.value') }}：</strong> {{ selectedObject.value.toFixed(2) }}
              </p>
              <!-- 摄像头特有按钮：查看数据 -->
              <button v-if="selectedObject.type === 'camera'" @click="showCameraData" class="mac-button camera-data-btn">{{ t('model3d.panels.infoPanel.viewData') }}</button>
            </div>
          </div>
          <!-- 当没有选中对象时显示的提示信息 -->
          <div class="info-content info-placeholder" v-else>
            <div class="placeholder-icon">🖱️</div>
            <p>{{ t('model3d.panels.infoPanel.clickToView') }}</p>
          </div>
        </div>
        <!-- 在信息面板之后，统计数据面板之前添加基地总体平面图面板 -->
        <div class="mac-panel panel-section">
          <h3 class="panel-title">{{ t('model3d.panels.siteplan.title', '基地总体平面图') }}</h3>
          <div class="siteplan-content">
            <!-- 平面图图像容器 -->
            <div class="siteplan-image-container">
              <img 
                :src="siteplanType === 'normal' 
                  ? '../src/assets/site_plans/gaojing_siteplan.png' 
                  : '../src/assets/site_plans/gaojing_Satellite_plan.png'" 
                :alt="siteplanType === 'normal' ? t('model3d.panels.siteplan.normal', '基地总体平面图') : t('model3d.panels.siteplan.satellite', '基地卫星图')" 
                class="siteplan-image" 
              />
              <!-- 添加放大按钮 -->
              <div class="zoom-button-container">
                <button @click="toggleSitePlanFullscreen" class="zoom-button">
                  <span class="zoom-icon">🔍</span>
                </button>
              </div>
            </div>
            <!-- 平面图控制按钮区域 -->
            <div class="siteplan-controls">
              <button 
                @click="changeSiteplanType('normal')" 
                :class="{ active: siteplanType === 'normal' }" 
                class="mac-button siteplan-btn">
                {{ t('model3d.panels.siteplan.normalBtn', '平面图') }}
              </button>
              <button 
                @click="changeSiteplanType('satellite')" 
                :class="{ active: siteplanType === 'satellite' }" 
                class="mac-button siteplan-btn">
                {{ t('model3d.panels.siteplan.satelliteBtn', '卫星图') }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- 统计数据面板：显示总体统计指标 -->
        <div class="mac-panel panel-section">
          <h3 class="panel-title">{{ t('model3d.panels.statistics.title', '统计数据（示例）') }}</h3>
          
          <!-- 将日期类型选择器 -->
          <div class="day-type-selector">
            <button 
              @click="setDayType('workday')" 
              :class="{ active: dayType === 'workday' }" 
              class="mac-button"> <!-- 使用 mac-button class -->
                {{ t('model3d.panels.timeSelect.workday') }}
            </button>
            <button 
              @click="setDayType('weekend')" 
              :class="{ active: dayType === 'weekend' }" 
              class="mac-button"> <!-- 使用 mac-button class -->
                {{ t('model3d.panels.timeSelect.weekend') }}
            </button>
          </div>

          <!-- stats-cards 现在只包含统计卡片 -->
          <div class="stats-cards">
            <!-- 行人总数卡片 -->
            <div class="stat-card">
              <div class="stat-title">{{ t('model3d.panels.statistics.pedestrianTotal', '行人总数') }}</div>
              <div class="stat-value">{{ dayType === 'workday' ? getRandomNumber('pedestrian', 'workday') : getRandomNumber('pedestrian', 'weekend') }}</div>
              <div class="stat-time">{{ dayType === 'workday' ? t('model3d.panels.timeSelect.workday') : t('model3d.panels.timeSelect.weekend') }}{{ t('model3d.panels.statistics.accumulative', '累计') }}</div>
            </div>
            <!-- 车辆总数卡片 -->
            <div class="stat-card">
              <div class="stat-title">{{ t('model3d.panels.statistics.vehicleTotal', '车辆总数') }}</div>
              <div class="stat-value">{{ dayType === 'workday' ? getRandomNumber('vehicle', 'workday') : getRandomNumber('vehicle', 'weekend') }}</div>
              <div class="stat-time">{{ dayType === 'workday' ? t('model3d.panels.timeSelect.workday') : t('model3d.panels.timeSelect.weekend') }}{{ t('model3d.panels.statistics.accumulative', '累计') }}</div>
            </div>
            <!-- 摄像头状态卡片 (如果需要可以取消注释) -->
            <!-- <div class="stat-card"> ... </div> -->
          </div>
        </div>
        
        <!-- 实时数据监控面板：显示数据变化趋势 -->
        <div class="mac-panel panel-section">
          <h3 class="panel-title">{{ t('model3d.panels.realTimeMonitor.title', '实时数据监控(示例)') }}</h3>
          <div class="realtime-data">
            <!-- 图表容器：通过ref引用，用于ECharts初始化 -->
            <div class="data-chart-container">
              <div ref="realtimeChart" class="data-chart"></div>
            </div>
            <!-- 图表图例：说明不同颜色代表的数据类型 -->
            <div class="chart-legend">
              <div class="legend-item">
                <span class="legend-color" style="background-color: #42b983;"></span>
                <span>{{ t('model3d.charts.pedestrianCount', '行人') }}</span>
              </div>
              <div class="legend-item">
                <span class="legend-color" style="background-color: #3080e8;"></span>
                <span>{{ t('model3d.charts.vehicleCount', '车辆') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 摄像头数据弹窗：点击摄像头的"查看数据"按钮时弹出 -->
    <div v-if="showCameraModal" class="camera-modal">
      <div class="mac-modal modal-content">
        <!-- 模态框标题栏 -->
        <div class="modal-header">
          <h3 class="modal-title">{{ t('model3d.modal.camera.title', '摄像头数据') }} - {{ selectedObject.name }}</h3>
          <!-- 关闭按钮：点击时将showCameraModal设为false -->
          <button @click="showCameraModal = false" class="close-btn">&times;</button>
        </div>
        <!-- 模态框内容区 -->
        <div class="modal-body">
          <!-- 标签页切换按钮 -->
          <div class="camera-tabs">
            <button :class="{ active: activeTab === 'live' }" @click="activeTab = 'live'" class="mac-tab-button">{{ t('model3d.modal.camera.liveTab', '摄像头画面(实时样式)') }}</button>
            <button :class="{ active: activeTab === 'mask' }" @click="activeTab = 'mask'" class="mac-tab-button">{{ t('model3d.modal.camera.maskTab', '摄像头Mask区域（行人检测）') }}</button>
            <button :class="{ active: activeTab === 'yolov5' }" @click="activeTab = 'yolov5'" class="mac-tab-button">{{ t('model3d.modal.camera.yoloTab', 'yolov5处理后画面（行人检测）') }}</button>
            <button :class="{ active: activeTab === 'data' }" @click="activeTab = 'data'" class="mac-tab-button">{{ t('model3d.modal.camera.dataTab', '历史数据(示例)') }}</button>
          </div>
          
          <!-- 实时图像标签页内容 -->
          <div v-if="activeTab === 'live'" class="tab-content">
            <div class="live-preview">
              <!-- 摄像头图像（根据mesh ID加载对应图像） -->
              <img :src="getCameraImageUrl(selectedObject.id)" :alt="selectedObject.name" />
              <!-- 检测信息：显示当前时间和预定义的检测数据 -->
              <div class="detection-info">
                <p>{{ t('model3d.modal.camera.time', '时间') }}：{{ new Date().toLocaleString() }}</p>
                <p>{{ t('model3d.modal.camera.pedestrianCount', '行人数量') }}：{{ getCameraDetectionData(selectedObject.id).pedestrians }}</p>
                <p>{{ t('model3d.modal.camera.vehicleCount', '车辆数量') }}：{{ getCameraDetectionData(selectedObject.id).vehicles }}</p>
                <p>{{ t('model3d.modal.camera.illegalPedestrians', '非法行人数量（绿化区禁止进入）') }}：{{ getCameraDetectionData(selectedObject.id).illegalPedestrians }}</p>
                <p>{{ t('model3d.modal.camera.illegalVehicles', '非法停车车辆数量（禁止停车区域）') }}：{{ getCameraDetectionData(selectedObject.id).illegalVehicles }}</p>
              </div>
            </div>
          </div>
          
          <!-- mask区域标签页内容 -->
          <div v-if="activeTab === 'mask'" class="tab-content">
            <div class="live-preview">
              <img :src="getCameraMaskAndRealImageUrl(selectedObject.id)" :alt="selectedObject.name" />
              <img :src="getCameraMaskImageUrl(selectedObject.id)" :alt="selectedObject.name" />
            </div>
          </div>
          
          <!-- yolov5识别画面标签页内容 -->
          <div v-if="activeTab === 'yolov5'" class="tab-content">
            <div class="live-preview">
              <img :src="getCameraYolov5ImageUrl(selectedObject.id)" :alt="selectedObject.name" />
              <!-- 检测信息：显示当前时间和预定义的检测数据 -->
              <div class="detection-info">
                <p>{{ t('model3d.modal.camera.time', '时间') }}：{{ new Date().toLocaleString() }}</p>
                <p>{{ t('model3d.modal.camera.pedestrianCount', '行人数量') }}：{{ getCameraDetectionData(selectedObject.id).pedestrians }}</p>
                <p>{{ t('model3d.modal.camera.vehicleCount', '车辆数量') }}：{{ getCameraDetectionData(selectedObject.id).vehicles }}</p>
                <p>{{ t('model3d.modal.camera.illegalPedestrians', '非法行人数量（绿化区禁止进入）') }}：{{ getCameraDetectionData(selectedObject.id).illegalPedestrians }}</p>
                <p>{{ t('model3d.modal.camera.illegalVehicles', '非法停车车辆数量（禁止停车区域）') }}：{{ getCameraDetectionData(selectedObject.id).illegalVehicles }}</p>
              </div>
            </div>
          </div>

          <!-- 历史数据标签页内容 -->
          <div v-if="activeTab === 'data'" class="tab-content">
            <!-- 图表容器：通过ref引用，用于ECharts初始化 -->
            <div id="cameraDataChart" class="camera-chart"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 添加全屏查看模态框 -->
    <div v-if="showSitePlanModal" class="siteplan-modal">
      <div class="modal-content siteplan-modal-content">
        <div class="modal-header">
          <h3 class="modal-title">{{ siteplanType === 'normal' ? t('model3d.panels.siteplan.normal', '基地总体平面图') : t('model3d.panels.siteplan.satellite', '基地卫星图') }}</h3>
          <button @click="showSitePlanModal = false" class="close-btn">&times;</button>
        </div>
        <div class="modal-body siteplan-modal-body">
          <img 
            :src="siteplanType === 'normal' 
              ? '../src/assets/site_plans/gaojing_siteplan.png' 
              : '../src/assets/site_plans/gaojing_Satellite_plan.png'" 
            :alt="siteplanType === 'normal' ? t('model3d.panels.siteplan.normal', '基地总体平面图') : t('model3d.panels.siteplan.satellite', '基地卫星图')"
            class="fullscreen-image" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 引入必要的Vue组件和第三方库
import { ref, onMounted, onBeforeUnmount, watch, computed, inject, reactive } from 'vue';
// Three.js：3D渲染库
import * as THREE from 'three';
// OrbitControls：Three.js的摄像机控制扩展，实现鼠标交互
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// TWEEN：动画过渡库，用于平滑过渡
import TWEEN from '@tweenjs/tween.js';
// ECharts：图表库，用于数据可视化
import * as echarts from 'echarts';
// Vue Router的路由获取钩子
import { useRoute } from 'vue-router';
// 在脚本开头添加GLTFLoader导入
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// 添加vue-i18n支持
import { useI18n } from 'vue-i18n';

// 从App.vue注入isModel3DPage
// 这个值决定当前是否在3D模型页面，用于应用特殊样式
// 参数2 false是默认值，当没有提供值时使用
const isModel3DPage = inject('isModel3DPage', false);
// 获取i18n实例
const { t } = useI18n();

// === 状态变量区域 ===
// Three.js渲染的canvas容器引用
const modelCanvas = ref(null);
// 实时图表容器引用
const realtimeChart = ref(null);
// 图层显示状态
const layers = ref({
  buildings: true,  // 建筑物图层
  roads: true,      // 道路图层
  cameras: true,    // 摄像头图层
  visionLines: false, // 摄像头视线线段图层 - 默认关闭
  visionPlane: false, // 摄像头视野平面图层 - 默认关闭
  data: false        // 数据图层 - 默认关闭
});
// 选择的数据类型：none(无数据)/pedestrian(行人)/vehicle(车辆)/combined(综合)
const selectedData = ref('none');
// 当前选择的小时(0-23)，默认中午12点
const currentHour = ref(12); 
// 日期类型：workday(工作日)/weekend(休息日)
const dayType = ref('workday');
// 是否启用轨道控制
const orbitControlsEnabled = ref(true);
// 是否显示线框模式
const isWireframe = ref(false);
// 当前选中的对象
const selectedObject = ref(null);
// 是否显示摄像头数据弹窗
const showCameraModal = ref(false);
// 当前激活的标签页：live(实时图像)/data(历史数据)
const activeTab = ref('live');
// 实时图表实例（非响应式）
let realtimeChartInstance = null;

// === Three.js相关变量 ===
// 这些变量不是响应式的，因为它们不需要触发UI更新
let scene, camera, renderer, controls, raycaster, mouse;
// 不同类型物体的组，方便统一控制
let buildingsGroup, roadsGroup, camerasGroup, dataGroup, visionLinesGroup, visionPlaneGroup;
// 所有可交互的网格对象数组
let allMeshes = [];

// === 辅助函数区域 ===

/**
 * 生成指定范围内的随机整数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 生成的随机整数
 */
/**
 * 根据类型和日期返回对应的数据总和
 * @param {string} type - 数据类型：'pedestrian'(行人)或'vehicle'(车辆)
 * @param {string} day - 日期类型：'workday'(工作日)或'weekend'(休息日)
 * @returns {number} 返回对应类型和日期的数据总和
 */
function getRandomNumber(type, day) {
  // 模拟人流量数据
  const pedestrianData = {
    workday: [3, 6, 12, 9, 6, 4, 10, 18, 14, 10, 8, 5, 4, 6, 10, 20, 28, 22, 14, 10, 8, 5, 4, 3],
    weekend: [2, 4, 5, 7, 9, 12, 15, 18, 20, 18, 16, 18, 20, 22, 24, 20, 22, 30, 28, 24, 16, 10, 6, 4]
  };

  // 模拟车流量数据
  const vehicleData = {
    workday: [2, 3, 6, 5, 3, 2, 5, 10, 8, 6, 5, 3, 2, 3, 5, 12, 16, 14, 8, 6, 5, 3, 2, 2],
    weekend: [1, 2, 3, 4, 5, 6, 8, 10, 12, 10, 9, 10, 12, 14, 16, 14, 16, 20, 18, 16, 12, 8, 5, 3]
  };
  
  // 根据类型和日期返回对应的数据总和
  if (type === 'pedestrian') {
    return pedestrianData[day].reduce((sum, value) => sum + value, 0);
  } else if (type === 'vehicle') {
    return vehicleData[day].reduce((sum, value) => sum + value, 0);
  }
  
  return 0;
}

/**
 * 获取对象类型的中文显示名称
 * @param {string} type - 对象类型：building/road/camera/data
 * @returns {string} 对应的中文名称
 */
function getTypeDisplayName(type) {
  const typeMap = {
    'building': t('model3d.objectTypes.building', '建筑物'),
    'road': t('model3d.objectTypes.road', '道路'),
    'camera': t('model3d.objectTypes.camera', '摄像头'),
    'data': t('model3d.objectTypes.data', '数据节点')
  };
  return typeMap[type] || type;
}

/**
 * 格式化尺寸信息为易读的字符串
 * @param {Object} dim - 尺寸对象，包含width/depth/height属性
 * @returns {string} 格式化后的尺寸字符串
 */
function formatDimension(dim) {
  if (!dim) return '';
  return `${dim.width}m × ${dim.depth}m × ${dim.height}m`;
}

/**
 * 生成摄像头的描述性名称
 * @param {string} originalName - 原始名称，通常是mesh名称
 * @returns {string} 生成的描述性名称
 */
function generateCameraName(originalName) {
  // 如果原始名称存在
  if (originalName) {
    // 首先尝试使用国际化名称映射
    if (t(`model3d.names.cameras.${originalName}`, null)) {
      return t(`model3d.names.cameras.${originalName}`);
    }
    
    // 如果没有找到映射，提取数字部分
    const match = originalName.match(/\d+/);
    if (match) {
      const num = match[0];
      return t('model3d.cameraName', {num: num});
    }
    return originalName;
  }
  
  // 如果没有原始名称，返回默认名称
  return t('model3d.defaultCameraName');
}

/**
 * 生成建筑物的描述性名称
 * @param {string} originalName - 原始名称，通常是mesh名称
 * @returns {string} 生成的描述性名称
 */
 function generateBuildingName(originalName) {
  // 如果原始名称存在
  if (originalName) {
    // 首先尝试使用国际化名称映射
    if (t(`model3d.names.buildings.${originalName}`, null)) {
      return t(`model3d.names.buildings.${originalName}`);
    }
    
    // 如果没有找到映射，提取数字部分
    const match = originalName.match(/\d+/);
    if (match) {
      const num = match[0];
      return t('model3d.buildingName', {num: num}, `建筑物${num}号`);
    }
    return originalName;
  }
  
  // 如果没有原始名称，返回默认名称
  return t('model3d.defaultBuildingName', '未命名建筑物');
}


// === Three.js初始化函数 ===

/**
 * 初始化Three.js场景和相关组件
 * 这是整个3D模型的核心初始化函数
 */
function initThreeJS() {
  console.log("初始化Three.js场景");
  console.log("Canvas元素存在:", !!modelCanvas.value);
  
  // 创建场景对象
  scene = new THREE.Scene();
  // 设置背景色为白色
  scene.background = new THREE.Color(0xFFFFFF);
  
  try {
    // 创建透视相机
    // 参数: 视场角度, 宽高比, 近裁剪面, 远裁剪面
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // 设置相机初始位置
    camera.position.set(50, 50, 50);
    // 让相机看向原点(0,0,0)
    camera.lookAt(0, 0, 0);
    
    // 创建WebGL渲染器
    renderer = new THREE.WebGLRenderer({ 
      antialias: true,              // 抗锯齿
      alpha: true,                  // 支持透明
      powerPreference: 'high-performance' // 性能优先
    });
    // 适配设备像素比例，确保高DPI设备上显示清晰
    renderer.setPixelRatio(window.devicePixelRatio);
    // 设置渲染尺寸为窗口大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 启用阴影渲染
    renderer.shadowMap.enabled = true;
    // 设置阴影类型为柔和PCF阴影
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // 记录尺寸信息，便于调试
    console.log("窗口尺寸:", window.innerWidth, window.innerHeight);
    console.log("Canvas尺寸:", renderer.domElement.width, renderer.domElement.height);
    
    // 将渲染器的canvas元素添加到DOM
    if (modelCanvas.value) {
      // 清除已有内容
      while (modelCanvas.value.firstChild) {
        modelCanvas.value.removeChild(modelCanvas.value.firstChild);
      }
      // 添加Three.js渲染器创建的canvas到DOM
      modelCanvas.value.appendChild(renderer.domElement);
      console.log("渲染器DOM元素已添加到画布");
    } else {
      console.error("modelCanvas元素不存在");
      return;
    }
    
    // 添加轨道控制器，实现鼠标交互
    controls = new OrbitControls(camera, renderer.domElement);
    // 启用阻尼效果，使相机移动更平滑
    controls.enableDamping = true;
    // 设置阻尼系数
    controls.dampingFactor = 0.05;
    
    // 添加环境光：从各个方向照射的柔和光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    // 添加平行光：模拟太阳光的定向光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    // 设置光源位置
    directionalLight.position.set(50, 200, 100);
    // 允许光源投射阴影
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // 创建不同类型物体的分组，方便统一管理
    buildingsGroup = new THREE.Group(); // 建筑物组
    roadsGroup = new THREE.Group();     // 道路组
    camerasGroup = new THREE.Group();   // 摄像头组
    dataGroup = new THREE.Group();      // 数据组
    visionLinesGroup = new THREE.Group();  // 摄像头视线线段组
    visionPlaneGroup = new THREE.Group();  // 摄像头视野平面组
    
    // 将分组添加到场景
    scene.add(buildingsGroup);
    scene.add(roadsGroup);
    scene.add(camerasGroup);
    scene.add(dataGroup);
    scene.add(visionLinesGroup);
    scene.add(visionPlaneGroup);
    
    // 初始化射线投射器，用于检测鼠标点击的物体
    raycaster = new THREE.Raycaster();
    // 初始化鼠标坐标，用于射线投射计算
    mouse = new THREE.Vector2();
    
    // 添加点击事件监听器
    renderer.domElement.addEventListener('click', onCanvasClick);
    
    // 创建社区模型内容：地面、建筑物、道路等
    createCommunityModel();
    
    // 启动动画循环，实现持续渲染和交互
    animate();
    
    // 监听窗口大小变化，调整渲染尺寸
    window.addEventListener('resize', onWindowResize);
  } catch (error) {
    console.error("Three.js初始化失败:", error);
  }
}

/**
 * 初始化实时数据图表
 * 使用ECharts创建行人和车辆数量的实时变化图表
 */
function initRealtimeChart() {
  if (!realtimeChart.value) return;
  
  // 如果已经存在实例，先销毁
  if (realtimeChartInstance) {
    realtimeChartInstance.dispose();
    realtimeChartInstance = null;
  }
  
  try {
    // 初始化ECharts实例
    realtimeChartInstance = echarts.init(realtimeChart.value);
    
    // 生成数据点
    const now = new Date();
    const timePoints = [];
    const pedestrianData = [];
    const vehicleData = [];
    
    // 生成最近30分钟的数据（每分钟一个点）
    for (let i = 0; i < 30; i++) {
      // 计算时间点
      const time = new Date(now.getTime() - (29 - i) * 60 * 1000);
      const timeStr = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
      timePoints.push(timeStr);
      
      // 根据一天中的时段生成不同的基础数据
      const hourOfDay = time.getHours();
      let pedestrianBase, vehicleBase;
      
      // 模拟不同时段的数据波动
      if (hourOfDay >= 7 && hourOfDay <= 9) { // 早高峰
        pedestrianBase = 40;
        vehicleBase = 20;
      } else if (hourOfDay >= 17 && hourOfDay <= 19) { // 晚高峰
        pedestrianBase = 50;
        vehicleBase = 25;
      } else if (hourOfDay >= 12 && hourOfDay <= 14) { // 午餐时间
        pedestrianBase = 30;
        vehicleBase = 15;
      } else if (hourOfDay >= 22 || hourOfDay <= 5) { // 深夜
        pedestrianBase = 10;
        vehicleBase = 5;
      } else { // 其他时间
        pedestrianBase = 20;
        vehicleBase = 10;
      }
      
      // 在基础值上添加随机波动（30%以内）
      pedestrianData.push(Math.floor(pedestrianBase + Math.random() * pedestrianBase * 0.3));
      vehicleData.push(Math.floor(vehicleBase + Math.random() * vehicleBase * 0.3));
    }
    
    // 设置ECharts配置选项
    const option = {
      grid: {
        top: 10,
        right: 10,
        bottom: 20,
        left: 40,
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        formatter: function(params) {
          let result = params[0].name + '<br/>';
          params.forEach(param => {
            const marker = `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${param.color};"></span>`;
            result += marker + param.seriesName + ': ' + param.value + '<br/>';
          });
          return result;
        }
      },
      xAxis: {
        type: 'category',
        data: timePoints,
        axisLabel: {
          interval: 4,
          fontSize: 10
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed'
          }
        }
      },
      series: [
        // 行人数据线
        {
          name: '行人',
          type: 'line',
          data: pedestrianData,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 2,
            color: '#42b983'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(66, 185, 131, 0.5)' },
                { offset: 1, color: 'rgba(66, 185, 131, 0.1)' }
              ]
            }
          }
        },
        // 车辆数据线
        {
          name: '车辆',
          type: 'line',
          data: vehicleData,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 2,
            color: '#3080e8'
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(48, 128, 232, 0.5)' },
                { offset: 1, color: 'rgba(48, 128, 232, 0.1)' }
              ]
            }
          }
        }
      ]
    };
    
    // 应用配置，生成图表
    realtimeChartInstance.setOption(option);
  } catch (e) {
    console.error("图表初始化失败:", e);
  }
}

/**
 * 创建社区模型的主函数
 * 从public文件夹加载GLTF模型
 */
function createCommunityModel() {

  console.log("开始加载基础GLTF模型");

  // 获取CDN基础路径
  const cdnBase = 'https://fidmrvwmxwnqcvtyzyjk.supabase.co/storage/v1/object/public/smart-community-pics-models/';
  console.log("使用CDN基础路径:", cdnBase);

  // 增强场景光照 - 解决模型黑色问题
  // 移除之前的灯光，避免重复
  scene.children = scene.children.filter(child => 
    !(child instanceof THREE.AmbientLight || 
      child instanceof THREE.DirectionalLight || 
      child instanceof THREE.HemisphereLight));
  
  // 添加强环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);
  
  // 添加多个方向光以确保模型各个面都有光照
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight1.position.set(50, 200, 100);
  directionalLight1.castShadow = true;
  scene.add(directionalLight1);
  
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
  directionalLight2.position.set(-50, 200, -100);
  directionalLight2.castShadow = true;
  scene.add(directionalLight2);
  
  // 添加半球光
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
  scene.add(hemiLight);
  
  // 创建GLTF加载器
  const loader = new GLTFLoader();
  
  // 加载进度管理
  const loadingManager = new THREE.LoadingManager();
  loadingManager.onStart = (url) => console.log(`开始加载: ${url}`);
  loadingManager.onProgress = (url, loaded, total) => {
    console.log(`加载进度：${Math.round(loaded/total*100)}% (${url})`);
  };
  loadingManager.onError = (url) => console.error(`加载出错：${url}`);
  loader.manager = loadingManager;
  
  // 1. 加载地面模型
  loader.load(`${cdnBase}/ground.gltf`, (gltf) => {
    console.log("地面模型加载成功", gltf);
    
    const ground = gltf.scene;
    ground.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true;
        
        // 修改地面材质 - 解决全黑问题
        if (child.material) {
          // 创建新的材质替换原有全黑材质
          child.material = new THREE.MeshStandardMaterial({
            color: 0x8bc34a,        // 绿色地面
            roughness: 0.8,          // 较高粗糙度
            metalness: 0.1,          // 低金属感
            side: THREE.DoubleSide   // 双面渲染
          });
          child.material.needsUpdate = true;
        }
        
        child.userData = {
          type: 'ground',
          name: '地面',
          selectable: false
        };
      }
    });
    
    
    scene.add(ground);
    console.log("地面模型已添加到场景");
    
  }, undefined, (error) => {
    console.error('加载地面模型失败:', error);
    // 不再使用备用地面创建方法
  });
  
  // 2. 加载建筑物模型
  loader.load(`${cdnBase}/building.gltf`, (gltf) => {
    console.log("建筑物模型加载成功");
    
    const buildings = gltf.scene;
    let hasMeshes = false;
    
    buildings.traverse(child => {
      if (child.isMesh) {
        hasMeshes = true;
        child.castShadow = true;
        child.receiveShadow = true;
        
        // 修改材质以解决黑色问题
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => {
              material.side = THREE.DoubleSide;
              material.metalness = 0.1;
              material.roughness = 0.8;
              material.needsUpdate = true;
              
              // 如果材质是黑色，更改为浅灰色
              if (material.color && material.color.r === 0 && 
                  material.color.g === 0 && material.color.b === 0) {
                material.color.set(0xcccccc);
              }
            });
          } else {
            child.material.side = THREE.DoubleSide;
            child.material.metalness = 0.1;
            child.material.roughness = 0.8;
            child.material.needsUpdate = true;
            
            // 如果材质是黑色，更改为浅灰色
            if (child.material.color && child.material.color.r === 0 && 
                child.material.color.g === 0 && child.material.color.b === 0) {
              child.material.color.set(0xcccccc);
            }
          }
        }
        
        child.userData = {
          type: 'building',
          name: generateBuildingName(child.name),
          id: child.name || `B${Math.floor(Math.random() * 1000)}`,
          position: child.position.clone(),
          selectable: true
        };
        
        allMeshes.push(child);
      }
    });
    
    if (!hasMeshes) {
      console.warn("建筑物模型没有包含任何网格!");
    }
    
    buildingsGroup.add(buildings);
    console.log("建筑物模型已添加到场景");
    
  }, undefined, (error) => {
    console.error('加载建筑物模型失败:', error);
    // 不再使用备用建筑物创建方法
  });
  
  // 3. 加载摄像头模型
  loader.load(`${cdnBase}/camera.gltf`, (gltf) => {
    console.log("摄像头模型加载成功");
    
    const camerasModel = gltf.scene;
    
    // 如果摄像头模型为空或没有网格，创建自定义摄像头标记
    let hasMeshes = false;
    camerasModel.traverse(child => {
      if (child.isMesh) {
        hasMeshes = true;
        child.castShadow = true;
        
        // 使摄像头更明显
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              mat.emissive = new THREE.Color(0xff5722);
              mat.emissiveIntensity = 0.8;
              mat.needsUpdate = true;
            });
          } else {
            child.material.emissive = new THREE.Color(0xff5722);
            child.material.emissiveIntensity = 0.8;
            child.material.needsUpdate = true;
          }
        }
        
        // 保存摄像头的实际世界坐标
        const worldPosition = new THREE.Vector3();
        child.getWorldPosition(worldPosition);
        
        child.userData = {
          type: 'camera',
          name: generateCameraName(child.name), // 使用生成函数替代直接使用mesh名称
          id: child.name || `CAM-${Math.floor(Math.random() * 100)}`, // 保留原始mesh名称作为ID
          // 使用实际世界坐标而不是局部坐标
          position: { 
            x: worldPosition.x, 
            y: worldPosition.y, 
            z: worldPosition.z 
          },
          status: Math.random() > 0.2, // 80%概率在线
          visibilityControl: true, // 是否可控制视线可视化
          selectable: true
        };
        
        allMeshes.push(child);
      }
    });
    
    // 如果模型没有网格，则创建自定义摄像头标记
    if (!hasMeshes) {
      console.warn("摄像头模型没有网格");
      // 不再创建自定义摄像头标记
    } else {
      camerasGroup.add(camerasModel);
    }
    
    console.log("摄像头模型已添加到场景");
    
  }, undefined, (error) => {
    console.error('加载摄像头模型失败:', error);
  });
  
  // 添加调试辅助工具
  // const axesHelper = new THREE.AxesHelper(50);
  // scene.add(axesHelper);
  
  const gridHelper = new THREE.GridHelper(200, 20);
  scene.add(gridHelper);
  
  // 创建数据可视化层
  createDataVisualization();
  
  // 调整相机视角以便于查看模型
  setTimeout(() => {
    resetView();
  }, 1000);
}

/**
 * 创建道路
 * 生成水平和垂直的道路，形成交叉路网
 */
function createRoads() {
  // 创建水平道路几何体
  const horizontalRoadGeometry = new THREE.PlaneGeometry(180, 10);
  // 创建道路材质 - 深灰色
  const roadMaterial = new THREE.MeshStandardMaterial({
    color: 0x424242, // 深灰色
    roughness: 0.9   // 较高粗糙度
  });
  
  // 创建中央水平道路
  const hRoad1 = new THREE.Mesh(horizontalRoadGeometry, roadMaterial);
  // 旋转使平面水平
  hRoad1.rotation.x = -Math.PI / 2;
  // 稍微提高位置，避免与地面重叠导致的z-fighting（闪烁）
  hRoad1.position.y = 0.1;
  // 添加用户数据
  hRoad1.userData = {
    type: 'road',
    name: '主干道',
    id: 'R1',
    position: { x: 0, y: 0.1, z: 0 },
    selectable: true
  };
  // 添加到道路组
  roadsGroup.add(hRoad1);
  // 添加到可交互网格数组
  allMeshes.push(hRoad1);
  
  // 创建垂直道路几何体
  const verticalRoadGeometry = new THREE.PlaneGeometry(10, 180);
  
  // 创建中央垂直道路
  const vRoad1 = new THREE.Mesh(verticalRoadGeometry, roadMaterial);
  // 旋转使平面水平
  vRoad1.rotation.x = -Math.PI / 2;
  // 稍微提高位置
  vRoad1.position.y = 0.1;
  // 添加用户数据
  vRoad1.userData = {
    type: 'road',
    name: '支干道',
    id: 'R2',
    position: { x: 0, y: 0.1, z: 0 },
    selectable: true
  };
  // 添加到道路组
  roadsGroup.add(vRoad1);
  // 添加到可交互网格数组
  allMeshes.push(vRoad1);
}

/**
 * 创建数据可视化
 * 初始化时不显示任何数据，等待用户选择
 */
function createDataVisualization() {
  // 初始调用更新函数，不显示任何数据
  updateDataVisualization();
}

/**
 * 更新数据可视化
 * 根据用户选择的数据类型、时间和日期类型更新数据柱状图
 */
function updateDataVisualization() {
  // 清除现有数据可视化内容
  while(dataGroup.children.length > 0) {
    dataGroup.remove(dataGroup.children[0]);
  }
  
  // 从可交互网格数组中移除旧的数据对象
  allMeshes = allMeshes.filter(mesh => !mesh.userData || mesh.userData.type !== 'data');
  
  // 如果没有选择数据类型，则直接返回
  if (selectedData.value === 'none') return;
  
  // 设置网格大小和单元格大小
  const gridSize = 15; // 10x10的网格
  const cellSize = 13; // 每个单元格10x10单位
  
  // 遍历网格创建数据可视化
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // 计算位置（相对于网格中心）
      const x = (i - gridSize/2) * cellSize + cellSize/2;
      const z = (j - gridSize/2) * cellSize + cellSize/2;
      
      // 根据数据类型获取高度值和颜色
      let height = 0;
      let color;
      
      switch (selectedData.value) {
        case 'pedestrian': // 行人流量
          height = getPedestrianData(i, j) * 10; // 放大10倍便于观察
          color = 0x4caf50; // 绿色
          break;
        case 'vehicle': // 车辆流量
          height = getVehicleData(i, j) * 10;
          color = 0x2196f3; // 蓝色
          break;
        case 'combined': // 综合数据
          // 车辆数据权重更高（*1.5）
          height = (getPedestrianData(i, j) + getVehicleData(i, j) * 1.5) * 5;
          color = 0xff9800; // 橙色
          break;
      }
      
      // 左边两排的网格几乎没有数据
      if (i <= 1) {
        // 左边两排的网格只有极少量数据（1%的概率）
        if (Math.random() > 0.99) {
          // 极少量的数据，高度很低
          const height = 0.6;
          const color = selectedData.value === 'pedestrian' ? 0x4caf50 : 
                        (selectedData.value === 'vehicle' ? 0x2196f3 : 0xff9800);
          
          const geometry = new THREE.BoxGeometry(cellSize * 0.8, height, cellSize * 0.8);
          const material = new THREE.MeshStandardMaterial({
            color: color,
            transparent: true,
            opacity: 0.7,
            wireframe: isWireframe.value
          });
          
          const bar = new THREE.Mesh(geometry, material);
          bar.position.set(x, height / 2, z);
          bar.userData = {
            type: 'data',
            name: getDataName(selectedData.value, i, j),
            position: { x, y: height / 2, z },
            value: height / 10, // 显示实际值（除以10）
            selectable: true
          };
          
          // 添加到数据组
          dataGroup.add(bar);
          // 添加到可交互网格数组
          allMeshes.push(bar);
        }
      }
      // 只在有明显数据的地方创建柱状图
      else if (height > 0.5) {
        // 为每个网格添加一些随机变化，使数据更加差异化
        height = height * (0.85 + Math.random() * 0.3);
        
        // 创建柱状图几何体和材质
        const geometry = new THREE.BoxGeometry(cellSize * 0.8, height, cellSize * 0.8);
        const material = new THREE.MeshStandardMaterial({
          color: color,
          transparent: true, // 开启透明
          opacity: 0.7,      // 半透明效果
          wireframe: isWireframe.value // 是否显示线框模式
        });
        
        // 创建网格
        const bar = new THREE.Mesh(geometry, material);
        // 设置位置（高度的一半，使底部在y=0平面上）
        bar.position.set(x, height / 2, z);
        // 添加用户数据
        bar.userData = {
          type: 'data',
          name: getDataName(selectedData.value, i, j),
          position: { x, y: height / 2, z },
          value: height / 10, // 显示实际值（除以10）
          selectable: true
        };
        
        // 添加到数据组
        dataGroup.add(bar);
        // 添加到可交互网格数组
        allMeshes.push(bar);
      }
    }
  }
}

/**
 * 获取数据显示名称
 * @param {string} type - 数据类型：pedestrian/vehicle/combined
 * @param {number} x - 网格X坐标
 * @param {number} y - 网格Y坐标
 * @returns {string} 格式化的数据名称
 */
function getDataName(type, x, y) {
  const typeNames = {
    'pedestrian': t('model3d.dataTypes.pedestrian', '行人流量'),
    'vehicle': t('model3d.dataTypes.vehicle', '车辆流量'),
    'combined': t('model3d.dataTypes.combined', '综合数据')
  };
  return `${typeNames[type]} (${x},${y})`;
}

/**
 * 获取模拟行人数据
 * 根据位置、时间和日期类型生成模拟数据
 * @param {number} x - 网格X坐标
 * @param {number} y - 网格Y坐标
 * @returns {number} 生成的数据值（0-1范围）
 */
function getPedestrianData(x, y) {
  // 根据时间和日期类型获取调整因子
  const hourFactor = getHourFactor(currentHour.value);
  const dayFactor = dayType.value === 'workday' ? 1 : 0.7; // 休息日人流减少30%
  
  // 创建不同区域的热点
  let value = 0;
  
  // 右侧区域（几乎无人流）
  if (x > 10) {
    value = Math.random() * 0.05; // 极低人流
  }
  // 右上区域（几乎无人流）
  else if (x > 8 && y > 8) {
    value = Math.random() * 0.05; // 极低人流
  }
  // 右下区域（几乎无人流）
  else if (x > 8 && y < 2) {
    value = Math.random() * 0.05; // 极低人流
  }
  // 中心区域（高人流）
  else if (Math.abs(x - 5) < 2 && Math.abs(y - 5) < 2) {
    value = 0.8;
  }
  // 道路交叉口（中等人流）
  else if ((Math.abs(x - 5) < 1 || Math.abs(y - 5) < 1) && 
      !(Math.abs(x - 5) < 1 && Math.abs(y - 5) < 1)) {
    // 垂直道路上的人流量随机分布，不是所有位置都有人
    if (Math.abs(x - 5) < 1 && Math.random() > 0.4) {
      value = 0.6;
    }
    // 水平道路上的人流量
    else if (Math.abs(y - 5) < 1) {
      value = 0.6;
    }
  }
  // 建筑物周围（较低人流）
  else if ((x < 3 && y < 3) || (x > 7 && y > 7 && x <= 8)) {
    value = 0.4;
  }
  // 其他区域（随机低值）
  else {
    value = Math.random() * 0.3;
  }
  
  // 应用时间和日期因子
  return value * hourFactor * dayFactor;
}

/**
 * 获取模拟车辆数据
 * 根据位置、时间和日期类型生成模拟数据
 * @param {number} x - 网格X坐标
 * @param {number} y - 网格Y坐标
 * @returns {number} 生成的数据值（0-1范围）
 */
function getVehicleData(x, y) {
  // 根据时间和日期类型获取调整因子
  const hourFactor = getHourFactor(currentHour.value);
  const dayFactor = dayType.value === 'workday' ? 1 : 0.5; // 休息日车流减少50%
  
  // 主要在道路上分布车辆
  let value = 0;
  
  // 右侧区域（几乎无车流）
  if (x > 10) {
    value = Math.random() * 0.02; // 极低车流
  }
  // 右上和右下区域（几乎无车流）
  else if ((x > 8 && y > 8) || (x > 8 && y < 2)) {
    value = Math.random() * 0.02; // 极低车流
  }
  // 水平道路（不均匀分布）
  else if (Math.abs(y - 5) < 1 && Math.random() > 0.2) {
    value = 0.7;
  }
  // 垂直道路（不均匀分布，且比水平道路少）
  else if (Math.abs(x - 5) < 1 && Math.random() > 0.4) {
    value = 0.5;
  }
  // 交叉口（高车流）
  else if (Math.abs(x - 5) < 1 && Math.abs(y - 5) < 1) {
    value = 1;
  }
  // 其他区域很少有车
  else {
    value = Math.random() * 0.05;
  }
  
  // 应用时间和日期因子
  return value * hourFactor * dayFactor;
}

/**
 * 根据小时获取活动因子
 * 不同时段人流车流量的变化系数
 * @param {number} hour - 小时(0-23)
 * @returns {number} 活动因子(0-1范围)
 */
function getHourFactor(hour) {
  // 早高峰 7-9点，递增
  if (hour >= 7 && hour <= 9) {
    return 0.8 + (hour - 7) * 0.1;
  }
  // 中午 11-13点，适中
  else if (hour >= 11 && hour <= 13) {
    return 0.7;
  }
  // 晚高峰 17-19点，递减
  else if (hour >= 17 && hour <= 19) {
    return 0.9 + (19 - hour) * 0.1;
  }
  // 晚上和凌晨 20-5点，低值
  else if (hour >= 20 || hour <= 5) {
    return 0.3;
  }
  // 其他时段，中等值
  else {
    return 0.5;
  }
}

/**
 * 更新基于时间的数据
 * 当时间滑块变化时调用此函数
 */
function updateTimeBasedData() {
  // 只有当选择了数据类型时才更新
  if (selectedData.value !== 'none') {
    updateDataVisualization();
  }
}

/**
 * 切换日期类型
 * @param {string} type - 日期类型：workday/weekend
 */
function setDayType(type) {
  dayType.value = type;
  // 更新数据可视化
  updateTimeBasedData();
}

/**
 * 格式化小时显示
 * @param {number} hour - 小时(0-23)
 * @returns {string} 格式化的时间字符串，如"12:00"
 */
function formatHour(hour) {
  return `${hour}:00`;
}

/**
 * 格式化位置信息
 * 将坐标转换为位置描述，使用mesh ID和建筑物ID进行映射
 * @param {Object} position - 三维坐标
 * @param {string} id - 对象ID，可能是mesh ID或建筑物ID
 * @returns {string} 位置描述
 */
function formatPosition(position, id, type) {
  // 从ID中提取mesh编号
  let meshNumber = '';
  if (id) {
    const match = id.match(/mesh_(\d+)/);
    if (match) {
      meshNumber = 'mesh_' + match[1];
    }
  }
  
  // 根据对象类型选择不同的映射表
  if (type === 'camera' && meshNumber) {
    // 尝试使用i18n获取摄像头位置描述
    const translatedLocation = t(`model3d.locations.cameras.${meshNumber}`, null);
    if (translatedLocation) {
      return translatedLocation;
    }
  } else if (type === 'building' && meshNumber) {
    // 尝试使用i18n获取建筑物位置描述
    const translatedLocation = t(`model3d.locations.buildings.${meshNumber}`, null);
    if (translatedLocation) {
      return translatedLocation;
    }
  }
  
  // 如果没有找到映射，返回坐标格式
  if (position) {
    return `X: ${position.x.toFixed(1)}, Y: ${position.y.toFixed(1)}, Z: ${position.z.toFixed(1)}`;
  }
  
  return t('model3d.objectInfo.unknownLocation');
}

/**
 * 切换图层显示
 * 根据复选框状态显示或隐藏特定图层
 * @param {string} layerName - 图层名称：buildings/roads/cameras/data
 */
function toggleLayer(layerName) {
  switch (layerName) {
    case 'buildings':
      buildingsGroup.visible = layers.value.buildings;
      break;
    case 'roads':
      roadsGroup.visible = layers.value.roads;
      break;
    case 'cameras':
      camerasGroup.visible = layers.value.cameras;
      break;
    case 'visionLines':
      // 如果图层被启用但模型还未加载，直接加载模型
      if (layers.value.visionLines && !modelLoadStatus.value.visionLines) {
        try {
          loadVisionLinesModel();
        } catch (error) {
          console.error('加载视线线段模型失败:', error);
          // 加载失败时，自动关闭该图层
          layers.value.visionLines = false;
          visionLinesGroup.visible = false;
        }
      } else {
        visionLinesGroup.visible = layers.value.visionLines;
      }
      break;
    case 'visionPlane':
      // 如果图层被启用但模型还未加载，直接加载模型
      if (layers.value.visionPlane && !modelLoadStatus.value.visionPlane) {
        try {
          loadVisionPlaneModel();
        } catch (error) {
          console.error('加载视野平面模型失败:', error);
          // 加载失败时，自动关闭该图层
          layers.value.visionPlane = false;
          visionPlaneGroup.visible = false;
        }
      } else {
        visionPlaneGroup.visible = layers.value.visionPlane;
      }
      break;
    case 'data':
      dataGroup.visible = layers.value.data;
      break;
  }
}

/**
 * 切换线框模式
 * 切换所有网格的线框显示模式
 */
function toggleWireframe() {
  // 反转线框模式状态
  isWireframe.value = !isWireframe.value;
  
  // 更新所有可见物体的线框模式
  allMeshes.forEach(mesh => {
    if (mesh.material) {
      mesh.material.wireframe = isWireframe.value;
    }
  });
  
  // 重新创建数据可视化，应用线框效果
  if (selectedData.value !== 'none') {
    updateDataVisualization();
  }
}

/**
 * 重置视角
 * 使用TWEEN平滑过渡到默认视角
 */
function resetView() {
  // 使用TWEEN创建相机位置的平滑过渡动画
  new TWEEN.Tween(camera.position)
    .to({ x: 50, y: 50, z: 50 }, 1000) // 目标位置和持续时间(毫秒)
    .easing(TWEEN.Easing.Cubic.Out) // 缓动函数
    .start();
    
  // 创建控制目标点的平滑过渡动画
  new TWEEN.Tween(controls.target)
    .to({ x: 0, y: 0, z: 0 }, 1000)
    .easing(TWEEN.Easing.Cubic.Out)
    .start();
}

/**
 * 处理模型点击事件
 * 检测点击位置是否有可选中的物体
 * @param {Event} event - 鼠标点击事件
 */
function onCanvasClick(event) {
  // 计算鼠标在标准化设备坐标中的位置（-1到1之间）
  const rect = modelCanvas.value.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / modelCanvas.value.clientWidth) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / modelCanvas.value.clientHeight) * 2 + 1;
  
  // 从相机位置沿鼠标点击方向发射射线
  raycaster.setFromCamera(mouse, camera);
  
  // 计算射线与可选中物体的交点
  const intersects = raycaster.intersectObjects(allMeshes);
  
  // 如果有交点，选中第一个物体
  if (intersects.length > 0) {
    const object = intersects[0].object;
    // 只选择标记为可选中的物体
    if (object.userData && object.userData.selectable) {
      selectedObject.value = object.userData;
    }
  } else {
    // 无交点时清除选中状态
    selectedObject.value = null;
  }
}

/**
 * 显示摄像头数据
 * 打开摄像头数据模态框并初始化图表
 */
function showCameraData() {
  // 显示模态框
  showCameraModal.value = true;
  
  // 确保在DOM更新后初始化图表
  setTimeout(() => {
    if (activeTab.value === 'data') {
      initCameraChart();
    }
  }, 50);
}

/**
 * 初始化摄像头数据图表
 * 使用ECharts创建24小时数据图表
 */
function initCameraChart() {
  // 获取图表容器
  const chartContainer = document.getElementById('cameraDataChart');
  if (!chartContainer) {
    console.error('Camera chart container not found');
    return;
  }
  
  // 创建ECharts实例
  const chartInstance = echarts.init(chartContainer);
  
  // 生成24小时数据
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  
  // 生成随机行人数据，根据不同时段设置不同基础值
  const pedestrianData = hours.map((_, i) => {
    if (i >= 7 && i <= 9) { // 早高峰
      return Math.floor(Math.random() * 8) + 1;
    } else if (i >= 17 && i <= 19) { // 晚高峰
      return Math.floor(Math.random() * 8) + 2;
    } else if (i >= 22 || i <= 5) { // 深夜
      return Math.floor(Math.random() * 2);
    } else { // 其他时间
      return Math.floor(Math.random() * 5) + 0;
    }
  });
  
  // 生成随机车辆数据
  const vehicleData = hours.map((_, i) => {
    if (i >= 7 && i <= 9) { // 早高峰
      return Math.floor(Math.random() * 9) + 1;
    } else if (i >= 17 && i <= 19) { // 晚高峰
      return Math.floor(Math.random() * 10) + 2;
    } else if (i >= 22 || i <= 5) { // 深夜
      return Math.floor(Math.random() * 6);
    } else { // 其他时间
      return Math.floor(Math.random() * 5) + 0;
    }
  });
  
  // 设置ECharts配置选项
  const option = {
    title: {
      text: t('model3d.charts.cameraDetectionTitle', '摄像头检测数据统计'),
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: [
        t('model3d.charts.pedestrianCount', '行人数量'), 
        t('model3d.charts.vehicleCount', '车辆数量')
      ],
      bottom: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: hours,
      name: t('model3d.charts.timeAxis', '时间')
    },
    yAxis: {
      type: 'value',
      name: t('model3d.charts.countAxis', '数量')
    },
    series: [
      // 行人数量线
      {
        name: t('model3d.charts.pedestrianCount', '行人数量'),
        type: 'line',
        data: pedestrianData,
        smooth: true,
        lineStyle: {
          width: 2,
          color: '#42b983'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(66, 185, 131, 0.5)' },
              { offset: 1, color: 'rgba(66, 185, 131, 0.1)' }
            ]
          }
        }
      },
      // 车辆数量线
      {
        name: t('model3d.charts.vehicleCount', '车辆数量'),
        type: 'line',
        data: vehicleData,
        smooth: true,
        lineStyle: {
          width: 2,
          color: '#3080e8'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(48, 128, 232, 0.5)' },
              { offset: 1, color: 'rgba(48, 128, 232, 0.1)' }
            ]
          }
        }
      }
    ]
  };
  
  // 应用配置，生成图表
  chartInstance.setOption(option);
}

/**
 * 更新检测列表DOM
 * @param {Array} detections - 检测记录数组
 */
function updateDetectionList(detections) {
  const detectionList = document.getElementById('detectionList');
  if (!detectionList) return;
  
  // 清空现有内容
  detectionList.innerHTML = '';
  
  // 添加每个检测记录
  detections.forEach(detection => {
    const item = document.createElement('div');
    item.className = 'detection-item';
    item.innerHTML = `
      <div class="detection-time">${detection.time}</div>
      <div class="detection-type detection-type-${detection.type}">${detection.type === 'pedestrian' ? t('model3d.detection.pedestrian', '行人') : t('model3d.detection.vehicle', '车辆')}</div>
      <div class="detection-description">${detection.description}</div>
    `;
    detectionList.appendChild(item);
  });
}

/**
 * 调整窗口大小事件处理函数
 * 在窗口大小变化时重新调整渲染器和相机
 */
function onWindowResize() {
  console.log("窗口大小改变");
  // 检查必要组件是否已初始化
  if (!camera || !renderer || !modelCanvas.value) {
    console.error("无法调整大小：组件未完全初始化");
    return;
  }
  
  // 获取新的窗口尺寸
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  // 更新相机宽高比
  camera.aspect = width / height;
  // 更新相机投影矩阵
  camera.updateProjectionMatrix();
  
  // 调整渲染器尺寸
  renderer.setSize(width, height);
  console.log("渲染器尺寸已更新:", width, height);
}

/**
 * 动画循环函数
 * 持续渲染场景，实现3D交互效果
 */
let frameCount = 0;
function animate() {
  // 请求下一帧动画
  requestAnimationFrame(animate);
  
  // 计数帧数，用于调试
  frameCount++;
  if (frameCount % 60 === 0) { // 每60帧记录一次
    //console.log("动画帧:", frameCount);
  }
  
  // 更新轨道控制器（实现阻尼效果）
  if (orbitControlsEnabled.value) {
    controls.update();
  }
  
  // 更新补间动画（实现平滑过渡效果）
  TWEEN.update();
  
  // 渲染场景
  renderer.render(scene, camera);
}

// === 生命周期钩子 ===

/**
 * 组件挂载时初始化Three.js和ECharts
 * 在Vue组件被挂载到DOM后执行
 */
onMounted(() => {
  console.log("组件已挂载");
  
  // 确保DOM已完全加载再初始化
  setTimeout(() => {
    // 初始化Three.js场景
    initThreeJS();
    // 初始化实时图表
    initRealtimeChart();
    
    // 设置一个额外的检查，以确保3D场景正确渲染
    setTimeout(() => {
      if (renderer && modelCanvas.value) {
        console.log("执行强制重新调整大小");
        onWindowResize();
      }
    }, 500);
  }, 100);
  
  // 监听摄像头模态框的标签切换
  // 当activeTab改变时触发回调函数
  watch(activeTab, (newTab) => {
    if (newTab === 'data' && showCameraModal.value) {
      // 确保DOM更新后初始化图表
      setTimeout(() => {
        initCameraChart();
      }, 50);
    }
  });
});

/**
 * 组件卸载前清理资源
 * 防止内存泄漏和资源占用
 */
onBeforeUnmount(() => {
  // 移除事件监听器
  window.removeEventListener('resize', onWindowResize);
  
  // 移除点击事件监听器
  if (renderer && renderer.domElement) {
    renderer.domElement.removeEventListener('click', onCanvasClick);
  }
  
  // 释放Three.js资源
  if (renderer) {
    renderer.dispose(); // 释放WebGL上下文
    // 从DOM中移除canvas元素
    if (modelCanvas.value) {
      modelCanvas.value.removeChild(renderer.domElement);
    }
  }
  
  // 释放ECharts实例
  if (realtimeChartInstance) {
    realtimeChartInstance.dispose();
  }
  
  // 释放几何体和材质，防止内存泄漏
  allMeshes.forEach(mesh => {
    // 释放几何体
    if (mesh.geometry) mesh.geometry.dispose();
    // 释放材质（可能是数组或单个材质）
    if (mesh.material) {
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(m => m.dispose());
      } else {
        mesh.material.dispose();
      }
    }
  });
});

/**
 * 切换特定摄像头的视线可视化
 * @param {string} cameraId - 摄像头ID
 * @param {string} visionType - 视线类型：'lines'/'points'
 */
function toggleCameraVision(cameraId, visionType) {
  // 这里应该实现切换特定摄像头视线显示的逻辑
  // 由于这需要修改数据结构和额外的代码，此处仅为占位
  console.log(`切换摄像头 ${cameraId} 的 ${visionType} 显示状态`);
}

/**
 * 检查特定摄像头的视线是否可见
 * @param {string} cameraId - 摄像头ID
 * @param {string} visionType - 视线类型：'lines'/'points'
 * @returns {boolean} 是否可见
 */
function isCameraVisionVisible(cameraId, visionType) {
  // 这里应该返回特定摄像头视线的可见状态
  // 由于这需要修改数据结构和额外的代码，此处仅返回全局图层状态
  return visionType === 'lines' ? layers.value.visionLines : layers.value.visionPoints;
}

// 添加新变量用于跟踪模型加载状态
const modelLoadStatus = ref({
  visionLines: false, // 是否已加载视线线段模型
  visionPoints: false, // 是否已加载视线投影点模型
  visionPlane: false, // 是否已加载视野平面模型
});

/**
 * 按需加载摄像头视线投影点模型
 * 此功能已被禁用
 */
function loadVisionPointsModel() {
  console.log("视线投影点功能已被禁用");
  // 不再加载视线投影点模型
  // 标记为已加载（实际上并未加载），避免重复调用
  modelLoadStatus.value.visionPoints = true;
  // 确保视线投影点组始终不可见
  visionPointsGroup.visible = false;
}

/**
 * 按需加载摄像头视线线段模型
 * 只在用户需要时才加载此模型
 */
function loadVisionLinesModel() {
  const cdnEnBase = 'https://smart-community-cdn.b-cdn.net';
  console.log("使用CDN国际路径:", cdnEnBase);
  console.log("开始加载摄像头视线线段模型");
  
  // 显示加载进度条，设置模型名称
  modelLoading.isLoading = true;
  modelLoading.model = t('model3d.panels.layerControl.visionLines', '摄像头视线线段');
  modelLoading.progress = 0;
  
  // 创建GLTF加载器
  const loader = new GLTFLoader();
  
  // 加载摄像头视线线段
  // 修正路径，确保正确加载
  const modelPath = `${cdnEnBase}/vision_lines.gltf`;
  console.log("尝试加载模型：", modelPath);
  
  loader.load(modelPath,(gltf) => {
      // 隐藏加载进度条
      modelLoading.isLoading = false;
      
      // 检查gltf和scene是否存在
      if (!gltf || !gltf.scene) {
        console.error('加载的模型缺少scene属性');
        modelLoadStatus.value.visionLines = true; 
        visionLinesGroup.visible = false;
        return;
      }
      
      const sceneRoot = gltf.scene;
      try {
        sceneRoot.traverse((child) => {
          // 根据类型自动添加到场景
          if (child.isMesh || child.isPoints || child.isLineSegments) {
            // 设置视线线段的材质（颜色梯度）
            if (child.isMesh) {
              child.material = new THREE.MeshBasicMaterial({
                color: 0xff3300,
                transparent: true,
                opacity: 0.05,
                side: THREE.DoubleSide,
              });
            }

            child.userData = {
              type: 'vision_line',
              name: '摄像头视线',
              selectable: false
            };
            
            visionLinesGroup.add(child);
            allMeshes.push(child);
          }
        });
        console.log('加载完成vision_lines', gltf);
        // 更新加载状态
        modelLoadStatus.value.visionLines = true;
      } catch (error) {
        console.error('处理vision_lines模型时出错:', error);
        modelLoadStatus.value.visionLines = true;
        visionLinesGroup.visible = false;
      }
    },
    (xhr) => {
      // 更新加载进度百分比
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        modelLoading.progress = percentComplete;
        console.log(`加载进度: ${percentComplete.toFixed(1)}%,vision_lines`);
      }
    },
    (err) => {
      // 隐藏加载进度条
      modelLoading.isLoading = false;
      
      console.error('加载错误:vision_lines', err);
      modelLoadStatus.value.visionLines = true;
      visionLinesGroup.visible = false;
      layers.value.visionLines = false;
    }
  );
}

/**
 * 按需加载摄像头视野平面模型
 * 只在用户需要时才加载此模型
 */
function loadVisionPlaneModel() {
  console.log("开始加载摄像头视野平面模型");
  const cdnBase = 'https://fidmrvwmxwnqcvtyzyjk.supabase.co/storage/v1/object/public/smart-community-pics-models/';

  // 显示加载进度条，设置模型名称
  modelLoading.isLoading = true;
  modelLoading.model = t('model3d.panels.layerControl.visionPlane', '摄像头视野平面');
  modelLoading.progress = 0;
  
  // 创建GLTF加载器
  const loader = new GLTFLoader();
  
  // 加载摄像头视野平面
  // 修正路径，确保正确加载
  const modelPath = `${cdnBase}/vision_plane.gltf`;
  
  console.log("尝试加载模型：", modelPath);
  
  loader.load(modelPath,(gltf) => {
      // 隐藏加载进度条
      modelLoading.isLoading = false;
      
      // 检查gltf和scene是否存在
      if (!gltf || !gltf.scene) {
        console.error('加载的视野平面模型缺少scene属性');
        modelLoadStatus.value.visionPlane = true; 
        visionPlaneGroup.visible = false;
        return;
      }
      
      const sceneRoot = gltf.scene;
      try {
        sceneRoot.traverse((child) => {
          // 根据类型自动添加到场景
          if (child.isMesh) {
            // 设置视野平面的材质（半透明黄色）
            child.material = new THREE.MeshBasicMaterial({ 
              color: 0xffcc00, 
              transparent: true, 
              opacity: 0.3,
              side: THREE.DoubleSide
            });
            
            child.userData = {
              type: 'vision_plane',
              name: '摄像头视野平面',
              selectable: false
            };
            
            visionPlaneGroup.add(child);
            allMeshes.push(child);
          }
        });
        console.log('加载完成vision_plane', gltf);
        // 更新加载状态
        modelLoadStatus.value.visionPlane = true;
      } catch (error) {
        console.error('处理vision_plane模型时出错:', error);
        modelLoadStatus.value.visionPlane = true;
        visionPlaneGroup.visible = false;
      }
    },
    (xhr) => {
      // 更新加载进度百分比
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        modelLoading.progress = percentComplete;
        console.log(`加载进度: ${percentComplete.toFixed(1)}%,vision_plane`);
      }
    },
    (err) => {
      // 隐藏加载进度条
      modelLoading.isLoading = false;
      
      console.error('加载错误:vision_plane', err);
      modelLoadStatus.value.visionPlane = true;
      visionPlaneGroup.visible = false;
      layers.value.visionPlane = false;
    }
  );
}


/**
 * 根据摄像头ID获取对应的图像URL
 * @param {string} cameraId - 摄像头ID（mesh名）
 * @returns {string} 图像URL
 */
function getCameraImageUrl(cameraId) {
  // 从ID中提取mesh编号
  const match = cameraId && cameraId.match(/mesh_(\d+)/);
  const cameraNum = match ? match[1].padStart(2, '0') : '00';
  console.log('cameraNum', cameraNum);
  
  // 使用编号构建图像URL路径
  const imageUrl = `../src/assets/Camera_images/mesh_${cameraNum}.jpeg`;
  console.log('imageUrl', imageUrl);
  
  // 如果没有有效ID，返回默认占位图
  if (!cameraId) {
    return 'https://via.placeholder.com/800x450.png?text=摄像头实时图像';
  }
  
  return imageUrl;
}

/**
 * 根据摄像头ID获取对应的mask图像URL
 * @param {string} cameraId - 摄像头ID（mesh名）
 * @returns {string} 图像URL
 */
 function getCameraMaskImageUrl(cameraId) {
  // 从ID中提取mesh编号
  const match = cameraId && cameraId.match(/mesh_(\d+)/);
  const cameraNum = match ? match[1].padStart(2, '0') : '00';
  console.log('cameraNum', cameraNum);
  
  // 使用编号构建图像URL路径
  const imageUrl = `../src/assets/Camera_masks/${cameraNum}.jpg`;
  console.log('imageUrl', imageUrl);
  
  // 如果没有有效ID，返回默认占位图
  if (!cameraId) {
    return 'https://via.placeholder.com/800x450.png?text=摄像头实时图像';
  }
  
  return imageUrl;
}

/**
 * 根据摄像头ID获取对应的mask与真实摄像头画面的图像URL
 * @param {string} cameraId - 摄像头ID（mesh名）
 * @returns {string} 图像URL
 */
 function getCameraMaskAndRealImageUrl(cameraId) {
  // 从ID中提取mesh编号
  const match = cameraId && cameraId.match(/mesh_(\d+)/);
  const cameraNum = match ? match[1].padStart(2, '0') : '00';
  console.log('cameraNum', cameraNum);
  
  // 使用编号构建图像URL路径
  const imageUrl = `../src/assets/Camera_masks/mask_${cameraNum}.jpeg`;
  console.log('imageUrl', imageUrl);
  
  // 如果没有有效ID，返回默认占位图
  if (!cameraId) {
    return 'https://via.placeholder.com/800x450.png?text=摄像头实时图像';
  }
  
  return imageUrl;
}

/**
 * 根据摄像头ID获取对应的图像URL
 * @param {string} cameraId - 摄像头ID（mesh名）
 * @returns {string} 图像URL
 */
 function getCameraYolov5ImageUrl(cameraId) {
  // 从ID中提取mesh编号
  const match = cameraId && cameraId.match(/mesh_(\d+)/);
  const cameraNum = match ? match[1].padStart(2, '0') : '00';
  console.log('cameraNum', cameraNum);
  
  // 使用编号构建图像URL路径
  const imageUrl = `../src/assets/Camera_yolov5/mesh_${cameraNum}.jpg`;
  console.log('imageUrl', imageUrl);
  
  // 如果没有有效ID，返回默认占位图
  if (!cameraId) {
    return 'https://via.placeholder.com/800x450.png?text=摄像头实时图像';
  }
  
  return imageUrl;
}

// 为不同摄像头ID预定义检测数据
const cameraDetectionData = {
  'mesh_0': { pedestrians: 2, vehicles: 7, illegalPedestrians: 1, illegalVehicles: 1 },
  'mesh_1': { pedestrians: 2, vehicles: 3, illegalPedestrians: 1, illegalVehicles: 1 },
  'mesh_2': { pedestrians: 3, vehicles: 0, illegalPedestrians: 1, illegalVehicles: 0 },
  'mesh_3': { pedestrians: 1, vehicles: 6, illegalPedestrians: 0, illegalVehicles: 1 },
  'mesh_4': { pedestrians: 1, vehicles: 4, illegalPedestrians: 0, illegalVehicles: 1 },
  'mesh_5': { pedestrians: 10, vehicles: 0, illegalPedestrians: 1, illegalVehicles: 0 },
  'mesh_6': { pedestrians: 4, vehicles: 4, illegalPedestrians: 1, illegalVehicles: 0 },
  'mesh_7': { pedestrians: 5, vehicles: 4, illegalPedestrians: 2, illegalVehicles: 2 }, 
  'mesh_8': { pedestrians: 4, vehicles: 0, illegalPedestrians: 1, illegalVehicles: 0 },
  'mesh_9': { pedestrians: 3, vehicles: 3, illegalPedestrians: 1, illegalVehicles: 1 },
  'mesh_10': { pedestrians: 1, vehicles: 0, illegalPedestrians: 0, illegalVehicles: 0 },
  'mesh_11': { pedestrians: 2, vehicles: 0, illegalPedestrians: 1, illegalVehicles: 1 },
  'mesh_12': { pedestrians: 2, vehicles: 0, illegalPedestrians: 0, illegalVehicles: 0 },
  'mesh_13': { pedestrians: 3, vehicles: 3, illegalPedestrians: 1, illegalVehicles: 0 },
  'mesh_14': { pedestrians: 2, vehicles: 0, illegalPedestrians: 1, illegalVehicles: 0 },
  'mesh_15': { pedestrians: 3, vehicles: 0, illegalPedestrians: 0, illegalVehicles: 0 },
  'mesh_16': { pedestrians: 1, vehicles: 4, illegalPedestrians: 0, illegalVehicles: 0 },
  'mesh_17': { pedestrians: 2, vehicles: 6, illegalPedestrians: 1, illegalVehicles: 0 },
  'mesh_18': { pedestrians: 2, vehicles: 2, illegalPedestrians: 0, illegalVehicles: 0 },
  'mesh_19': { pedestrians: 2, vehicles: 0, illegalPedestrians: 0, illegalVehicles: 0 },
  'mesh_20': { pedestrians: 1, vehicles: 0, illegalPedestrians: 0, illegalVehicles: 0 },
  'mesh_21': { pedestrians: 2, vehicles: 3, illegalPedestrians: 1, illegalVehicles: 0 },
  'mesh_22': { pedestrians: 2, vehicles: 0, illegalPedestrians: 1, illegalVehicles: 0 },
  'mesh_23': { pedestrians: 1, vehicles: 5, illegalPedestrians: 0, illegalVehicles: 0 },
  'mesh_24': { pedestrians: 2, vehicles: 2, illegalPedestrians: 1, illegalVehicles: 2 },
  'mesh_25': { pedestrians: 1, vehicles: 3, illegalPedestrians: 0, illegalVehicles: 0 },
  'mesh_26': { pedestrians: 1, vehicles: 3, illegalPedestrians: 0, illegalVehicles: 0 },
  'mesh_27': { pedestrians: 3, vehicles: 8, illegalPedestrians: 0, illegalVehicles: 4 },
  'mesh_28': { pedestrians: 2, vehicles: 2, illegalPedestrians: 1, illegalVehicles: 0 },
  'mesh_29': { pedestrians: 1, vehicles: 0, illegalPedestrians: 1, illegalVehicles: 0 },
  'mesh_30': { pedestrians: 2, vehicles: 0, illegalPedestrians: 1, illegalVehicles: 0 },
  'mesh_31': { pedestrians: 2, vehicles: 5, illegalPedestrians: 1, illegalVehicles: 0 },
  'mesh_32': { pedestrians: 2, vehicles: 1, illegalPedestrians: 1, illegalVehicles: 0 },
  'mesh_33': { pedestrians: 2, vehicles: 6, illegalPedestrians: 1, illegalVehicles: 2 },
  'mesh_34': { pedestrians: 11, vehicles: 4, illegalPedestrians: 5, illegalVehicles: 1 },
  'mesh_35': { pedestrians: 3, vehicles: 1, illegalPedestrians: 1, illegalVehicles: 0 },
  'mesh_36': { pedestrians: 3, vehicles: 5, illegalPedestrians: 1, illegalVehicles: 0 },
  // 可以继续添加更多摄像头的数据
};

/**
 * 根据摄像头ID获取检测数据
 */
function getCameraDetectionData(cameraId) {
  // 尝试匹配完整ID
  if (cameraDetectionData[cameraId]) {
    return cameraDetectionData[cameraId];
  }
  
  // 尝试匹配ID中的mesh编号
  const match = cameraId && cameraId.match(/mesh_(\d+)/);
  if (match && cameraDetectionData[`mesh_${match[1]}`]) {
    return cameraDetectionData[`mesh_${match[1]}`];
  }
  
  // 未找到匹配的数据，返回默认值
  return { pedestrians: 0, vehicles: 0, illegalPedestrians: 0, illegalVehicles: 0 };
}

// 添加全屏查看模态框
const showSitePlanModal = ref(false);

// 添加平面图类型状态
const siteplanType = ref('normal'); // 'normal'表示平面图，'satellite'表示卫星图

// 添加切换平面图全屏显示的方法
function toggleSitePlanFullscreen() {
  showSitePlanModal.value = !showSitePlanModal.value;
}

// 添加切换平面图类型的方法
function changeSiteplanType(type) {
  siteplanType.value = type;
}

// 添加模型加载状态
const modelLoading = reactive({
  isLoading: false,
  model: '',
  progress: 0
});

</script>

<style>
/* 非scoped样式，确保能覆盖全局样式 */
/* 使用!important标记确保样式优先级高于全局样式 */

/* 3D模型容器样式 - 确保全屏显示 */
.model-3d {
  position: fixed !important; /* 固定定位 */
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important; /* 100%视口宽度 */
  height: 100vh !important; /* 100%视口高度 */
  overflow: hidden !important; /* 隐藏溢出内容 */
  z-index: 1 !important; /* 确保在其他内容之上 */
  margin: 0 !important;
  padding: 0 !important;
}

/* 主容器样式 */
.main-container {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 1 !important;
}

/* 3D画布容器样式 */
.model-canvas-container {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 1 !important; /* z-index为1，确保在背景层之上 */
  margin: 0 !important;
  padding: 0 !important;
}

/* 3D画布样式 */
.model-canvas {
  width: 100% !important;
  height: 100% !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  background-color: #222 !important; /* 深灰色背景 */
  margin: 0 !important;
  padding: 0 !important;
}

/* Three.js生成的canvas元素样式 */
.model-canvas canvas {
  display: block !important; /* 防止canvas底部出现间隙 */
  width: 100% !important;
  height: 100% !important;
}

/* 标题样式 */
h1 {
  position: fixed !important;
  top: 80px !important;
  left: 0 !important;
  right: 0 !important;
  text-align: center !important;
  margin: 0 !important;
  color: #fff !important;
  font-size: 1.8rem !important;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important; /* 文字阴影效果 */
  z-index: 10 !important; /* 确保在3D场景之上 */
}

/* 左侧控制面板样式 */
.left-panel {
  position: fixed !important;
  top: calc(var(--navbar-height) + 15px) !important; /* 增加顶部间距 */
  left: 0.5rem !important;
  width: 220px !important; /* 减小宽度 */
  max-height: calc(100vh - var(--navbar-height) - var(--footer-height) - 20px) !important; /* 减去顶栏、页尾和间距 */
  overflow-y: auto !important;
  z-index: 100 !important; /* 低于顶栏和页尾的z-index */
  display: flex !important;
  flex-direction: column !important;
  gap: 0.5rem !important; /* 面板之间的间距缩小 */
  padding: 0 !important;
}

/* 右侧数据面板样式 */
.right-panel {
  position: fixed !important;
  top: calc(var(--navbar-height) + 15px) !important; /* 增加顶部间距 */
  right: 0.5rem !important;
  width: 250px !important; /* 减小宽度 */
  max-height: calc(100vh - var(--navbar-height) - var(--footer-height) - 20px) !important; /* 减去顶栏、页尾和间距 */
  overflow-y: auto !important;
  z-index: 100 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 0.5rem !important; /* 面板之间的间距缩小 */
  padding: 0 !important;
}

/* 面板通用样式 - 半透明效果 */
.panel-section {
  background: rgba(255, 255, 255, 0.85) !important; /* 半透明白色背景 */
  backdrop-filter: blur(5px) !important; /* 背景模糊效果 */
  -webkit-backdrop-filter: blur(5px) !important; /* Safari兼容 */
  border-radius: 8px !important; /* 圆角边框 */
  padding: 1rem !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15) !important; /* 阴影效果 */
  margin-bottom: 0.8rem !important;
  border: 1px solid rgba(0,0,0,0.05) !important; /* 添加细边框增强视觉区分 */
  box-shadow: 0 2px 6px rgba(0,0,0,0.08) !important; /* 增强阴影效果 */
}

/* 面板标题样式 */
h3 {
  margin: 0 0 0.8rem 0;
  color: #2c3e50;
  font-size: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eaeaea; /* 下边框分隔线 */
}

/* 图层控制区域样式 */
.layer-controls {
  display: flex;
  flex-direction: column;
  gap: 0.8rem; /* 控制项间距 */
}

/* 图层项样式 */
.layer-item {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* 复选框和文字间距 */
}

/* 复选框样式 */
input[type="checkbox"] {
  cursor: pointer; /* 鼠标悬停显示手型 */
}

/* 按钮通用样式 */
button {
  background: #42b983; /* 绿色按钮 */
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  transition: background 0.3s; /* 过渡效果 */
}

/* 按钮悬停效果 */
button:hover {
  background: #3aa876; /* 深绿色 */
}

/* 激活状态的按钮 */
button.active {
  background: #333; /* 深灰色 */
}

/* 控制按钮样式 */
.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-right: 0;
}

/* 按钮图标样式 */
.icon {
  margin-right: 5px;
}

/* 数据选择器样式 */
.data-select select {
  width: 100%;
  padding: 0.6rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

/* 时间滑动条容器 */
.time-slider {
  margin-bottom: 1rem;
}

/* 滑动条样式 */
input[type="range"] {
  width: 100%;
  margin-bottom: 0.5rem;
}

/* 时间显示样式 */
.time-display {
  text-align: center;
  font-weight: bold;
  color: #2c3e50;
}

/* 日期选择按钮容器 */
.day-select {
  display: flex;
  justify-content: space-between;
}

/* 信息内容容器 */
.info-content {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 6px;
  min-height: 120px;
}

/* 无选中对象时的提示样式 */
.info-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #aaa;
  gap: 0.5rem;
}

/* 提示图标样式 */
.placeholder-icon {
  font-size: 2rem;
}

/* 对象信息头部样式 */
.object-info-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

/* 对象类型图标样式 */
.object-icon {
  font-size: 1.2rem;
}

/* 不同类型对象的图标颜色 */
.object-icon.building {
  color: #e74c3c; /* 红色 - 建筑物 */
}

.object-icon.road {
  color: #3498db; /* 蓝色 - 道路 */
}

.object-icon.camera {
  color: #f39c12; /* 黄色 - 摄像头 */
}

.object-icon.data {
  color: #2ecc71; /* 绿色 - 数据节点 */
}

/* 对象信息标题样式 */
.object-info-header h4 {
  margin: 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

/* 对象信息内容样式 */
.object-info-body p {
  margin: 0.5rem 0;
  color: #5d6778;
}

/* 在线状态样式 */
.status-online {
  color: #2ecc71; /* 绿色 */
  font-weight: bold;
}

/* 离线状态样式 */
.status-offline {
  color: #e74c3c; /* 红色 */
  font-weight: bold;
}

/* 摄像头数据按钮样式 */
.camera-data-btn {
  margin-top: 1rem;
  width: 100%;
}

/* 统计卡片容器样式 */
.stats-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 改为两列 */
  gap: 0.8rem;
}

/* 统计卡片样式 */
.stat-card {
  background: linear-gradient(135deg, #f5f7fa 20%, #eaeaea 100%); /* 渐变背景 */
  padding: 0.8rem;
  border-radius: 6px;
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100px; /* 确保所有卡片高度一致 */
}

/* 统计卡片标题样式 */
.stat-title {
  font-size: 0.75rem; /* 缩小字体 */
  color: #5d6778;
  margin-bottom: 0.3rem;
  word-break: break-word; /* 确保长文本能换行 */
  line-height: 1.1; /* 减小行高 */
  overflow: hidden; /* 防止溢出 */
}

/* 统计卡片数值样式 */
.stat-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.3rem;
  flex-grow: 1; /* 让数值区域占据更多空间 */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 统计卡片时间标签样式 */
.stat-time {
  font-size: 0.7rem;
  color: #7f8c8d;
  word-break: break-word; /* 确保长文本能换行 */
}

/* 实时数据图表容器样式 */
.realtime-data {
  display: flex;
  flex-direction: column;
}
/* 数据图表容器样式 */
.data-chart-container {
  width: 100%;
  height: 180px;
  margin-left: -1.5rem; /* 增加左侧边距以适应y轴标签 */
}

/* 数据图表样式 */
.data-chart {
  width: 100%;
  height: 100%;
}

/* 图表图例容器样式 */
.chart-legend {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

/* 图例项样式 */
.legend-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
}

/* 图例颜色方块样式 */
.legend-color {
  width: 10px;
  height: 10px;
  border-radius: 50%; /* 圆形图例点 */
}

/* 使用说明列表样式 */
.instruction-list {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

/* 使用说明项样式 */
.instruction-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 0.9rem;
  color: #5d6778;
}

/* 最后一项不需要下边框 */
.instruction-list li:last-child {
  border-bottom: none;
}

/* 摄像头模态框样式 */
.camera-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* 半透明黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 确保在最上层 */
}

/* 模态框内容容器 */
.modal-content {
  width: 80%;
  max-width: 900px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

/* 模态框标题栏 */
.modal-header {
  padding: 1rem 1.5rem;
  background-color: #f3f3f3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

/* 模态框标题 */
.modal-header h3 {
  margin: 0;
  color: #2c3e50;
  border-bottom: none;
  padding-bottom: 0;
}

/* 关闭按钮样式 */
.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #5d6778;
  cursor: pointer;
  padding: 0;
  margin: 0;
}

/* 模态框内容区域 */
.modal-body {
  padding: 1.5rem;
}

/* 标签页导航 */
.camera-tabs {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1.5rem;
}

/* 标签页按钮 */
.camera-tabs button {
  background: none;
  color: #5d6778;
  border: none;
  padding: 0.8rem 1.5rem;
  margin: 0;
  margin-bottom: -1px;
  border-bottom: 2px solid transparent; /* 透明底部边框 */
}

/* 激活状态的标签页 */
.camera-tabs button.active {
  color: #42b983; /* 绿色 */
  border-bottom: 2px solid #42b983; /* 绿色底部边框 */
  background: none;
}

/* 标签页内容区域 */
.tab-content {
  min-height: 300px;
}

/* 实时预览容器 */
.live-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

/* 预览图像样式 */
.live-preview img {
  flex: 2;
  min-width: 300px;
  border-radius: 8px;
  max-width: 100%;
  height: auto;
}

/* 检测信息区域 */
.detection-info {
  flex: 1;
  min-width: 200px;
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
}

.stats-panel {
  margin-bottom: 20px;
}

.stats-panel h4 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 5px;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.stat-box {
  flex: 0 0 30%;
  background-color: white;
  border-radius: 5px;
  padding: 12px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  text-align: center;
  transition: all 0.3s ease;
}

.stat-box:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.stat-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 18px;
  font-weight: bold;
  color: #42b983;
}

.time-value {
  font-size: 14px;
  color: #666;
}

#currentPedestrianCount {
  color: #42b983;
}

#currentVehicleCount {
  color: #2196f3;
}

/* 摄像头图表容器 */
.camera-chart {
  height: 350px;
  width: 100%;
}

/* 响应式设计调整 - 大屏幕 */
@media (max-width: 1200px) {
  /* 在中等屏幕上减小面板宽度 */
  .left-panel, .right-panel {
    width: 250px;
  }
  
  /* 减小面板内边距 */
  .panel-section {
    padding: 0.8rem;
  }
}

/* 响应式设计调整 - 小屏幕 */
@media (max-width: 768px) {
  /* 在移动设备上调整面板位置 */
  .left-panel, .right-panel {
    position: fixed;
    top: auto;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    width: auto;
    max-height: 250px;
    flex-direction: column;
  }
  
  /* 在移动设备上隐藏右侧面板 */
  .right-panel {
    display: none;
  }
  
  /* 调整面板宽度 */
  .panel-section {
    width: auto;
  }
  
  /* 添加面板切换按钮（在移动设备上使用） */
  .panel-toggle {
    position: fixed;
    top: 70px;
    right: 1rem;
    z-index: 20;
    display: block;
  }
}

/* 3D模型页面特殊样式 - 导航栏 */
.model-3d-page .navbar {
  background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
  backdrop-filter: blur(5px); /* 背景模糊 */
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 100;
}

/* 3D模型页面特殊样式 - 页脚 */
.model-3d-page .footer {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-top: 1px solid rgba(234, 234, 234, 0.5);
  position: relative;
  z-index: 100;
}

/* 3D模型页面特殊样式 - 主内容区 */
.model-3d-page .main-content {
  padding: 0;
  max-width: none;
  width: 100%;
}

/* Model3D.vue 中要添加的样式 */

/* 顶栏样式调整 - 减小高度并固定在顶部 */
body.model-page .navbar {
  padding: 0.4rem 1rem !important; /* 更小的内边距 */
  min-height: 36px !important; /* 更小的最小高度 */
  font-size: 0.9rem !important;
  position: fixed !important; /* 确保固定在顶部 */
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 1000 !important;
}

/* 页尾样式调整 - 减小高度并固定在底部 */
body.model-page .footer {
  padding: 0.1rem 0 !important; /* 更小的内边距 */
  font-size: 0.8rem !important;
  position: fixed !important; /* 确保固定在底部 */
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 40px !important; /* 固定高度 */
  z-index: 1000 !important;
}

/* 计算顶栏和页尾的高度 */
:root {
  --navbar-height: 36px; /* 顶栏高度包括padding */
  --footer-height: 24px; /* 页尾高度 */
}

/* 完全隐藏滚动条但保持功能 */
.left-panel::-webkit-scrollbar, .right-panel::-webkit-scrollbar {
  width: 4px !important;
}

.left-panel::-webkit-scrollbar-thumb, .right-panel::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.2) !important;
  border-radius: 2px !important;
}

/* 面板内部样式调整，使内容更紧凑 */
.panel-section {
  padding: 0.75rem !important;
  margin-bottom: 0 !important; /* 使用gap属性控制间距，这里不需要margin */
  border: 1px solid rgba(0,0,0,0.05) !important; /* 添加细边框增强视觉区分 */
  box-shadow: 0 2px 6px rgba(0,0,0,0.08) !important; /* 增强阴影效果 */
}

.panel-title {
  font-size: 0.95rem !important;
  margin: 0 0 0.6rem 0 !important;
  padding-bottom: 0.4rem !important;
  color: #333 !important;
  font-weight: 600 !important;
  border-bottom: 1px solid rgba(0,0,0,0.1) !important; /* 更明显的分隔线 */
}

/* 减小各种控件的尺寸 */
button, .mac-button {
  padding: 0.4rem 0.8rem !important;
  font-size: 0.9rem !important;
}

.info-content {
  min-height: 80px !important;
  padding: 0.6rem !important;
}

.recent-detections {
  margin-top: 20px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

.recent-detections h4 {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
}

.detection-list {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.detection-item {
  padding: 8px 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  animation: fadeIn 0.5s ease-in-out;
}

.detection-item:last-child {
  border-bottom: none;
}

.detection-time {
  flex: 0 0 80px;
  font-size: 12px;
  color: #666;
}

.detection-type {
  flex: 0 0 50px;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  text-align: center;
  margin: 0 10px;
}

.detection-type-pedestrian {
  background-color: rgba(66, 185, 131, 0.2);
  color: #42b983;
}

.detection-type-vehicle {
  background-color: rgba(32, 150, 243, 0.2);
  color: #229543;
}

.detection-description {
  flex: 1;
  font-size: 13px;
  color: #333;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 日期类型选择器容器样式 */
.day-type-selector {
  display: flex;
  justify-content: center; /* 居中按钮 */
  gap: 0.8rem; /* 按钮间距 */
  margin-bottom: 1.2rem; /* 与下方卡片的间距 */
}

/* 调整 mac-button 的激活状态 (确保有这个或类似的规则) */
/* 如果已经有全局的 .mac-button.active 样式，可以跳过此步 */
.mac-button.active {
  background-color: #229543 !important; /* 使用更醒目的激活颜色，例如蓝色 */
  color: white !important;
  /* 可以添加其他样式，例如移除边框 */
  border: none; 
}

/* 基地总体平面图面板样式 */
.siteplan-content {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.siteplan-image-container {
  width: 100%;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.siteplan-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.siteplan-image:hover {
  transform: scale(1.02);
}

.siteplan-controls {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
}

.siteplan-btn {
  flex: 1;
  max-width: 100px;
  font-size: 0.85rem !important;
  padding: 0.35rem 0.6rem !important;
}

.siteplan-btn.active {
  background-color: #229543 !important;
  color: white !important;
  border: none;
}

/* 放大按钮样式 */
.zoom-button-container {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
}

.zoom-button {
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.zoom-button:hover {
  transform: scale(1.2);
}

.zoom-icon {
  font-size: 24px;
}

/* 全屏模态框样式 */
.siteplan-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.siteplan-modal-content {
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.siteplan-modal-body {
  flex: 1;
  overflow: auto;
  padding: 0;
}

.fullscreen-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

/* 放大按钮样式 */
.siteplan-image-container {
  position: relative;
}

.zoom-button-container {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.zoom-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.zoom-button:hover {
  transform: scale(1.1);
  background-color: white;
}

.zoom-icon {
  font-size: 16px;
}

/* 平面图全屏模态框样式 */
.siteplan-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.siteplan-modal-content {
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.siteplan-modal-body {
  flex: 1;
  overflow: auto;
  padding: 0;
}

.fullscreen-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

/* 添加进度条样式 */
.loading-progress {
  margin: 10px 0 15px;
  padding: 10px;
  background-color: rgba(245, 245, 247, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.loading-text {
  font-size: 14px;
  margin-bottom: 6px;
  color: #333;
}

.progress-bar {
  height: 8px;
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #42b983; /* 保持与主题一致的绿色 */
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  text-align: right;
  margin-top: 4px;
  color: #666;
}
</style> 