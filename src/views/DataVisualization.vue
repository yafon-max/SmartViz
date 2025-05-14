<template>
  <div class="data-viz">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <div class="sidebar-header">
        <h3>{{ t('app.title') }}</h3>
      </div>
      <div class="sidebar-menu">
        <router-link to="/" class="menu-item" exact-active-class="active">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>{{ t('app.nav.home') }}</span>
        </router-link>
        
        <router-link to="/algorithm" class="menu-item" active-class="active">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <span>{{ t('app.nav.algorithm') }}</span>
        </router-link>

        <router-link to="/model" class="menu-item" active-class="active">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
            <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
            <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <span>{{ t('app.nav.model') }}</span>
        </router-link>

        <router-link to="/data" class="menu-item" active-class="active">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
          <span>{{ t('app.nav.data') }}</span>
        </router-link>
      </div>
    </div>

    <!-- 主内容区 -->
    <div class="main-content">
      <!-- <h1 class="page-title">{{ t('dataViz.title') }}</h1> -->
      
      <!-- 新增：概览数据日期类型切换 -->
      <div class="overview-day-selector mac-card">
         <span>{{ t('dataViz.filters.viewData') }}:</span>
         <button @click="setOverviewDayType('workday')" 
                 :class="{ active: overviewDayType === 'workday' }">
           {{ t('dataViz.filters.workday') }}
         </button>
         <button @click="setOverviewDayType('weekend')" 
                 :class="{ active: overviewDayType === 'weekend' }">
           {{ t('dataViz.filters.weekend') }}
         </button>
      </div>

      <!-- 数据概览卡片 -->
      <div class="data-overview">
        <div class="mac-card overview-card">
          <h3>{{ t('dataViz.overview.pedestrianTotal') }}</h3>
          <div class="stat">{{ pedestrianTotal }}</div>
          <div class="trend up">{{ pedestrianTrend }} {{ t('dataViz.overview.weekCompare') }}</div>
        </div>
        <div class="mac-card overview-card">
          <h3>{{ t('dataViz.overview.vehicleTotal') }}</h3>
          <div class="stat">{{ vehicleTotal }}</div>
          <div class="trend down">{{ vehicleTrend }} {{ t('dataViz.overview.weekCompare') }}</div>
        </div>
        <div class="mac-card overview-card">
          <h3>{{ t('dataViz.overview.peakHours') }}</h3>
          <div class="stat">{{ peakHours }}</div>
          <div class="trend neutral">{{ overviewDayType === 'workday' ? t('dataViz.overview.workday') : t('dataViz.overview.weekend') }}</div>
        </div>
        <div class="mac-card overview-card">
          <h3>{{ t('dataViz.overview.abnormalEvents') }}</h3>
          <div class="stat">{{ abnormalEvents }}</div>
          <div class="trend up">{{ abnormalTrend }} {{ t('dataViz.overview.weekCompare') }}</div>
        </div>
      </div>
      
      <!-- 数据图表区域 -->
      <div class="mac-card chart-container">
        <!-- 时间选择器 -->
        <div class="filter-section">
          <div class="day-type-filter">
            <span>{{ t('dataViz.filters.dayType') }}:</span>
            <div class="type-buttons">
              <button @click="changeDayType('all')" :class="{ active: dayType === 'all' }">{{ t('dataViz.filters.all') }}</button>
              <button @click="changeDayType('workday')" :class="{ active: dayType === 'workday' }">{{ t('dataViz.filters.workday') }}</button>
              <button @click="changeDayType('weekend')" :class="{ active: dayType === 'weekend' }">{{ t('dataViz.filters.weekend') }}</button>
            </div>
          </div>
        </div>
        
        <!-- 主要图表 -->
        <div class="charts">
          <div class="chart-wrapper">
            <h3 class="chart-title">{{ t('dataViz.charts.pedestrianDistribution') }}</h3>
            <div ref="pedestrianChart" class="chart"></div>
          </div>
          <div class="chart-wrapper">
            <h3 class="chart-title">{{ t('dataViz.charts.vehicleDistribution') }}</h3>
            <div ref="vehicleChart" class="chart"></div>
          </div>
        </div>
        
        <!-- 热力图 -->
        <div class="heatmap-section">
          <h3 class="chart-title">{{ t('dataViz.charts.communityHeatmap') }}</h3>
          <div class="heatmap-filters">
            <button @click="changeHeatmapType('pedestrian')" :class="{ active: heatmapType === 'pedestrian' }">{{ t('dataViz.charts.pedestrian') }}</button>
            <button @click="changeHeatmapType('vehicle')" :class="{ active: heatmapType === 'vehicle' }">{{ t('dataViz.charts.vehicle') }}</button>
          </div>
          <div ref="heatmapChart" class="heatmap-chart"></div>
        </div>
      </div>
      
      <!-- 社区公共空间诊断与改造 -->
      <div class="mac-card space-diagnosis-section">
        <h2 class="section-title">{{ t('dataViz.spaceDiagnosis.title') }}</h2>
        
        <!-- 分类内容切换标签 -->
        <div class="space-diagnosis-tabs">
          <button @click="changeDiagnosisTab('classification')" 
                  :class="{ active: diagnosisTab === 'classification' }">
            {{ t('dataViz.spaceDiagnosis.classification') }}
          </button>
          <button @click="changeDiagnosisTab('strategy')" 
                  :class="{ active: diagnosisTab === 'strategy' }">
            {{ t('dataViz.spaceDiagnosis.strategy') }}
          </button>
          <button @click="changeDiagnosisTab('masterplan')" 
                  :class="{ active: diagnosisTab === 'masterplan' }">
            {{ t('dataViz.spaceDiagnosis.masterplan') }}
          </button>
        </div>
        
        <!-- 不同人车特征下的公共空间分类 -->
        <div v-if="diagnosisTab === 'classification'" class="space-classification">
          <div class="scenario-filters">
            <button v-for="(scenario, index) in scenarios" 
                    :key="index" 
                    @click="changeScenario(scenario.id)"
                    :class="{ active: currentScenario === scenario.id }">
              {{ scenario.name }}
            </button>
          </div>
          
          <!-- 当前场景的详情展示 -->
          <div class="document-style">
            <h3 class="document-title">{{ getCurrentScenario().name }}</h3>
            <p class="document-paragraph">{{ getCurrentScenario().description }}</p>
            
            <!-- 摄像头列表 -->
            <div class="camera-list">
              <h4>{{ t('dataViz.spaceDiagnosis.representative') }}</h4>
              <div class="camera-chips">
                <div v-for="camera in getCurrentScenario().cameras" 
                     :key="camera"
                     class="camera-chip"
                     @click="selectCamera(camera)"
                     :class="{ active: selectedCamera === camera }">
                  {{ camera }}
                </div>
              </div>
              </div>
            
            <!-- 场景照片展示 -->
            <div class="scenario-images">
              <div class="image-section">
                <h4>{{ t('dataViz.spaceDiagnosis.illegalPedestrians') }}</h4>
                <div class="image-gallery">
                  <div v-for="(img, idx) in getCurrentImages('pedestrian')" 
                       :key="idx" 
                       class="gallery-item">
                    <img :src="img.url" :alt="img.caption">
                    <p class="image-caption">{{ img.caption }}</p>
                  </div>
                </div>
              </div>
              
              <div class="image-section">
                <h4>{{ t('dataViz.spaceDiagnosis.parking') }}</h4>
                <div class="image-gallery">
                  <div v-for="(img, idx) in getCurrentImages('parking')" 
                       :key="idx" 
                       class="gallery-item">
                    <img :src="img.url" :alt="img.caption">
                    <p class="image-caption">{{ img.caption }}</p>
                  </div>
                </div>
              </div>
              
              <div class="image-section daily-data">
                <h4>{{ t('dataViz.spaceDiagnosis.dailyData') }}</h4>
                <div class="daily-data-container">
                  <img :src="getCurrentDailyImage().url" :alt="getCurrentDailyImage().caption">
                  <p class="image-caption">{{ getCurrentDailyImage().caption }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 改造设计策略 -->
        <div v-if="diagnosisTab === 'strategy'" class="redesign-strategy">
          <div class="strategy-filters">
            <button v-for="(scenario, index) in scenarios" 
                    :key="index" 
                    @click="changeScenario(scenario.id)"
                    :class="{ active: currentScenario === scenario.id }">
              {{ scenario.name }}
            </button>
          </div>
          
          <!-- 策略详情 -->
          <div class="document-style">
            <h3 class="document-title">{{ getCurrentScenario().name }}：{{ getCurrentStrategy().title }}</h3>
            <p class="document-paragraph">{{ getCurrentStrategy().description }}</p>
            
            <!-- 摄像头列表 -->
            <div class="camera-list">
              <h4>{{ t('dataViz.spaceDiagnosis.targetAreas') }}</h4>
              <div class="camera-chips">
                <div v-for="camera in getCurrentStrategy().cameras" 
                     :key="camera"
                     class="camera-chip"
                     @click="selectStrategyCamera(camera)"
                     :class="{ active: selectedStrategyCamera === camera }">
                  {{ camera }}
                </div>
              </div>
            </div>
            
            <!-- 设计效果图 -->
            <div class="design-images">
              <h4 class="document-subtitle">{{ t('dataViz.spaceDiagnosis.redesignRenderings') }}</h4>
              <div class="rendering-gallery">
                <div v-for="(img, idx) in getCurrentStrategy().images" 
                     :key="idx" 
                     class="rendering-item">
                  <img :src="img.url" :alt="img.caption">
                  <p class="image-caption">{{ img.caption }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 改造后的空间总图 -->
        <div v-if="diagnosisTab === 'masterplan'" class="masterplan">
          <div class="document-style">
            <h3 class="document-title">{{ t('dataViz.spaceDiagnosis.masterplanTitle') }}</h3>
            <p class="document-paragraph">{{ t('dataViz.spaceDiagnosis.masterplanDescription') }}</p>
            
            <div class="masterplan-images">
              <div class="masterplan-item">
                <h4>{{ t('dataViz.spaceDiagnosis.analysisMap') }}</h4>
                <img :src="`src/assets/site_plans/gaojing_siteplan.png`" :alt="t('dataViz.spaceDiagnosis.analysisMapAlt')">
                <div class="document-content">
                  <p class="document-paragraph">{{ t('dataViz.spaceDiagnosis.analysisDescription') }}</p>
                </div>
              </div>
              
              <div class="masterplan-item">
                <h4>{{ t('dataViz.spaceDiagnosis.designMap') }}</h4>
                <img :src="`src/assets/spacial_design/site_plan_design.png`" :alt="t('dataViz.spaceDiagnosis.designMapAlt')">
                <div class="document-content">
                  <p class="document-paragraph">{{ t('dataViz.spaceDiagnosis.designDescriptionPart1') }}</p>
                  <p class="document-paragraph">{{ t('dataViz.spaceDiagnosis.designDescriptionPart2') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import * as echarts from 'echarts';
import { useI18n } from 'vue-i18n';

// 获取i18n实例
const { t, locale } = useI18n();

// 状态变量：用于控制UI状态和存储选择
const timeRange = ref('week');
const dayType = ref('all');
const heatmapType = ref('pedestrian');
const overviewDayType = ref('workday');

// 社区公共空间诊断与改造状态
const diagnosisTab = ref('classification'); // 默认显示分类标签
const currentScenario = ref('highVehicleLowPedestrian'); // 默认显示人少车多场景
const selectedCamera = ref('');
const selectedStrategyCamera = ref('');

// 图表引用：通过ref引用DOM元素，用于初始化图表
const pedestrianChart = ref(null);
const vehicleChart = ref(null);
const heatmapChart = ref(null);

// 图表实例：用于存储图表的实例，方便后续操作
let pedestrianChartInstance = null;
let vehicleChartInstance = null;
let heatmapChartInstance = null;

// 将静态的scenarios数组改为计算属性
const scenarios = computed(() => [
  {
    id: 'highVehicleLowPedestrian',
    name: t('dataViz.scenarios.highVehicleLowPedestrian.name'),
    description: t('dataViz.scenarios.highVehicleLowPedestrian.description'),
    cameras: ['Camera-03', 'Camera-07', 'Camera-34'],
    images: {
      pedestrian: [
        { url: '../src/assets/LowP-HighV/07_people.jpg', caption: t('dataViz.scenarios.imageCaption.pedestrianDetection') }
      ],
      parking: [
        { url: '../src/assets/LowP-HighV/07_car.jpeg', caption: t('dataViz.scenarios.imageCaption.parkingDetection') },
      ],
      dailyData: { url: '../src/assets/LowP-HighV/07_data.png', caption: t('dataViz.scenarios.imageCaption.dailyData') }
    },
    strategy: {
      title: t('dataViz.scenarios.highVehicleLowPedestrian.strategy.title'),
      description: t('dataViz.scenarios.highVehicleLowPedestrian.strategy.description'),
      cameras: ['Camera-03', 'Camera-07', 'Camera-34'],
      images: [
        { url: '../src/assets/LowP-HighV/07_design1.jpeg', caption: t('dataViz.scenarios.highVehicleLowPedestrian.strategy.image1') },
        { url: '../src/assets/LowP-HighV/07_design2.jpeg', caption: t('dataViz.scenarios.highVehicleLowPedestrian.strategy.image2') }
      ]
    }
  },
  {
    id: 'lowVehicleLowPedestrian',
    name: t('dataViz.scenarios.lowVehicleLowPedestrian.name'),
    description: t('dataViz.scenarios.lowVehicleLowPedestrian.description'),
    cameras: ['Camera-26', 'Camera-29'],
    images: {
      pedestrian: [
        { url: '../src/assets/LowP-LowV/29_people.jpg', caption: t('dataViz.scenarios.imageCaption.pedestrianDetection') },
      ],
      parking: [
        { url: '../src/assets/LowP-LowV/29_car.jpeg', caption: t('dataViz.scenarios.imageCaption.noParkingDetection') },
      ],
      dailyData: { url: '../src/assets/LowP-LowV/29_data.png', caption: t('dataViz.scenarios.imageCaption.dailyData') }
    },
    strategy: {
      title: t('dataViz.scenarios.lowVehicleLowPedestrian.strategy.title'),
      description: t('dataViz.scenarios.lowVehicleLowPedestrian.strategy.description'),
      cameras: ['Camera-26', 'Camera-29'],
      images: [
        { url: '../src/assets/LowP-LowV/29_design1.jpeg', caption: t('dataViz.scenarios.lowVehicleLowPedestrian.strategy.image1') },
        { url: '../src/assets/LowP-LowV/29_design2.jpeg', caption: t('dataViz.scenarios.lowVehicleLowPedestrian.strategy.image2') }
      ]
    }
  },
  {
    id: 'highPedestrianLowVehicle',
    name: t('dataViz.scenarios.highPedestrianLowVehicle.name'),
    description: t('dataViz.scenarios.highPedestrianLowVehicle.description'),
    cameras: ['Camera-08', 'Camera-14', 'Camera-22'],
    images: {
      pedestrian: [
        { url: '../src/assets/HighP-LowV/08_people.jpg', caption: t('dataViz.scenarios.imageCaption.pedestrianDetection') },
      ],
      parking: [
        { url: '../src/assets/HighP-LowV/08_car.jpg', caption: t('dataViz.scenarios.imageCaption.noParkingDetection') },
      ],
      dailyData: { url: '../src/assets/HighP-LowV/08_data.png', caption: t('dataViz.scenarios.imageCaption.dailyData') }
    },
    strategy: {
      title: t('dataViz.scenarios.highPedestrianLowVehicle.strategy.title'),
      description: t('dataViz.scenarios.highPedestrianLowVehicle.strategy.description'),
      cameras: ['Camera-08', 'Camera-14', 'Camera-22'],
      images: [
        { url: '../src/assets/HighP-LowV/08_design1.jpeg', caption: t('dataViz.scenarios.highPedestrianLowVehicle.strategy.image1') },
        { url: '../src/assets/HighP-LowV/08_design2.jpeg', caption: t('dataViz.scenarios.highPedestrianLowVehicle.strategy.image2') },
        { url: '../src/assets/HighP-LowV/08_design3.jpeg', caption: t('dataViz.scenarios.highPedestrianLowVehicle.strategy.image3') },  
        { url: '../src/assets/HighP-LowV/08_design_c22_1.jpeg', caption: t('dataViz.scenarios.highPedestrianLowVehicle.strategy.image4') },
        { url: '../src/assets/HighP-LowV/08_design_c22_2.jpeg', caption: t('dataViz.scenarios.highPedestrianLowVehicle.strategy.image5') }
      ]
    }
  },
  {
    id: 'alternatePeaks',
    name: t('dataViz.scenarios.alternatePeaks.name'),
    description: t('dataViz.scenarios.alternatePeaks.description'),
    cameras: ['Camera-33', 'Camera-35'],
    images: {
      pedestrian: [
        { url: '../src/assets/PV-Balanced/33_people.jpg', caption: t('dataViz.scenarios.imageCaption.pedestrianDetection') }
      ],
      parking: [
        { url: '../src/assets/PV-Balanced/33_car.jpeg', caption: t('dataViz.scenarios.imageCaption.parkingDetection') },
      ],
      dailyData: { url: '../src/assets/PV-Balanced/33_data.png', caption: t('dataViz.scenarios.imageCaption.peakTimeData') }
    },
    strategy: {
      title: t('dataViz.scenarios.alternatePeaks.strategy.title'),
      description: t('dataViz.scenarios.alternatePeaks.strategy.description'),
      cameras: ['Camera-33', 'Camera-35'],
      images: [
        { url: '../src/assets/PV-Balanced/33_design1.jpeg', caption: t('dataViz.scenarios.alternatePeaks.strategy.image1') },
        { url: '../src/assets/PV-Balanced/33_design2.jpeg', caption: t('dataViz.scenarios.alternatePeaks.strategy.image2') }
      ]
    }
  }
]);

// 获取当前选中的场景数据
const getCurrentScenario = () => {
  return scenarios.value.find(s => s.id === currentScenario.value) || scenarios.value[0];
};

// 获取当前场景下指定类型的图片
const getCurrentImages = (type) => {
  const scenario = getCurrentScenario();
  return scenario.images[type] || [];
};

// 获取当前场景的每日数据图片
const getCurrentDailyImage = () => {
  const scenario = getCurrentScenario();
  return scenario.images.dailyData || { url: '', caption: '' };
};

// 获取当前场景的改造策略
const getCurrentStrategy = () => {
  const scenario = getCurrentScenario();
  return scenario.strategy || { title: '', description: '', cameras: [], images: [] };
};

// 切换诊断标签
function changeDiagnosisTab(tab) {
  diagnosisTab.value = tab;
}

// 切换场景
function changeScenario(id) {
  currentScenario.value = id;
  // 重置选中的摄像头
  selectedCamera.value = '';
  selectedStrategyCamera.value = '';
}

// 选择摄像头
function selectCamera(camera) {
  selectedCamera.value = camera;
}

// 选择策略摄像头
function selectStrategyCamera(camera) {
  selectedStrategyCamera.value = camera;
}

// 模拟人流量数据
const pedestrianData = {
  workday: [3, 6, 12, 9, 6, 4, 10, 18, 14, 10, 8, 5, 4, 6, 10, 20, 28, 22, 14, 10, 8, 5, 4, 3],
  weekend: [2, 4, 5, 7, 9, 12, 15, 18, 20, 18, 16, 18, 20, 22, 24, 20, 22, 30, 28, 24, 16, 10, 6, 4],
  all: []
};

// 模拟车流量数据
const vehicleData = {
  workday: [2, 3, 6, 5, 3, 2, 5, 10, 8, 6, 5, 3, 2, 3, 5, 12, 16, 14, 8, 6, 5, 3, 2, 2],
  weekend: [1, 2, 3, 4, 5, 6, 8, 10, 12, 10, 9, 10, 12, 14, 16, 14, 16, 20, 18, 16, 12, 8, 5, 3],  
  all: []
};

// 合并工作日和休息日数据计算平均值
pedestrianData.all = pedestrianData.workday.map((val, idx) => 
  Math.round((val + pedestrianData.weekend[idx]) / 2)
);
vehicleData.all = vehicleData.workday.map((val, idx) => 
  Math.round((val + vehicleData.weekend[idx]) / 2)
);

// 初始化图表
function initCharts() {
  // 初始化行人流量图表
  pedestrianChartInstance = echarts.init(pedestrianChart.value);
  updatePedestrianChart();
  
  // 初始化车辆流量图表
  vehicleChartInstance = echarts.init(vehicleChart.value);
  updateVehicleChart();
  
  // 初始化热力图
  heatmapChartInstance = echarts.init(heatmapChart.value);
  updateHeatmapChart();
  
  // 窗口大小变化时调整图表大小
  window.addEventListener('resize', () => {
    pedestrianChartInstance.resize();
    vehicleChartInstance.resize();
    heatmapChartInstance.resize();
  });
}

// 更新行人流量图表
function updatePedestrianChart() {
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        return `${params[0].axisValue}${t('dataViz.charts.timeUnit').split('（')[0]}<br/>${params[0].seriesName}: ${params[0].value}${t('dataViz.charts.personCount').split('数')[0]}`;
      }
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 24 }, (_, i) => i),
      name: t('dataViz.charts.timeUnit'),
      nameLocation: 'middle',
      nameGap: 30,
      axisLabel: {
        formatter: '{value}:00'
      }
    },
    yAxis: {
      type: 'value',
      name: t('dataViz.charts.personCount'),
      nameLocation: 'middle',
      nameGap: 30
    },
    series: [{
      name: t('dataViz.charts.pedestrian'),
      type: 'line',
      smooth: true,
      data: pedestrianData[dayType.value],
      itemStyle: {
        color: '#42b983'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(66, 185, 131, 0.5)'
          }, {
            offset: 1,
            color: 'rgba(66, 185, 131, 0.1)'
          }]
        }
      }
    }]
  };
  
  pedestrianChartInstance.setOption(option);
}

// 更新车辆流量图表
function updateVehicleChart() {
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        return `${params[0].axisValue}${t('dataViz.charts.timeUnit').split('（')[0]}<br/>${params[0].seriesName}: ${params[0].value}${t('dataViz.charts.vehicleCount').split('数')[0]}`;
      }
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 24 }, (_, i) => i),
      name: t('dataViz.charts.timeUnit'),
      nameLocation: 'middle',
      nameGap: 30,
      axisLabel: {
        formatter: '{value}:00'
      }
    },
    yAxis: {
      type: 'value',
      name: t('dataViz.charts.vehicleCount'),
      nameLocation: 'middle',
      nameGap: 30
    },
    series: [{
      name: t('dataViz.charts.vehicle'),
      type: 'line',
      smooth: true,
      data: vehicleData[dayType.value],
      itemStyle: {
        color: '#3080e8'
      },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(48, 128, 232, 0.5)'
          }, {
            offset: 1,
            color: 'rgba(48, 128, 232, 0.1)'
          }]
        }
      }
    }]
  };
  
  vehicleChartInstance.setOption(option);
}

// 模拟热力图数据
function generateHeatmapData(type) {
  // 模拟一个10x10的网格
  const data = [];
  const max = type === 'pedestrian' ? 50 : 25;
  
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      // 根据位置生成不同的值，模拟热点
      let value = 0;
      
      // 创建一些热点区域
      if (type === 'pedestrian') {
        // 右上角热点（社区中心）
        if (i < 3 && j > 6) {
          value = Math.round(Math.random() * 20 + 30);
        } 
        // 左下角热点（社区入口）
        else if (i > 6 && j < 3) {
          value = Math.round(Math.random() * 15 + 25);
        } 
        // 其他区域随机
        else {
          value = Math.round(Math.random() * 20);
        }
      } else {
        // 车辆热点：道路
        if (i === 4 || j === 5) {
          value = Math.round(Math.random() * 10 + 15);
        } else {
          value = Math.round(Math.random() * 10);
        }
      }
      
      data.push([i, j, value]);
    }
  }
  
  return { data, max };
}

// 更新热力图
function updateHeatmapChart() {
  const { data, max } = generateHeatmapData(heatmapType.value);
  
  const option = {
    tooltip: {
      position: 'top',
      formatter: (params) => {
        return `${t('dataViz.charts.coordinate')}：(${params.data[0]}, ${params.data[1]})<br/>${t('dataViz.charts.value')}：${params.data[2]}`;
      }
    },
    grid: {
      top: '10%',
      left: '5%',
      right: '10%',
      bottom: '10%'
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 10 }, (_, i) => i),
      splitArea: {
        show: true
      },
      axisLabel: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      data: Array.from({ length: 10 }, (_, i) => i),
      splitArea: {
        show: true
      },
      axisLabel: {
        show: false
      }
    },
    visualMap: {
      min: 0,
      max: max,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%',
      color: heatmapType.value === 'pedestrian' 
        ? ['#f00', '#ffba08', '#80ed99'] 
        : ['#f00', '#48cae4', '#023e8a']
    },
    series: [{
      name: heatmapType.value === 'pedestrian' ? t('dataViz.charts.pedestrian') : t('dataViz.charts.vehicle'),
      type: 'heatmap',
      data: data,
      label: {
        show: false
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };
  
  heatmapChartInstance.setOption(option);
}

// 切换时间范围
function changeTimeRange(range) {
  timeRange.value = range;
  // 在实际应用中，这里会根据时间范围请求不同的数据
}

// 切换日期类型
function changeDayType(type) {
  dayType.value = type;
  updatePedestrianChart();
  updateVehicleChart();
}

// 切换热力图类型
function changeHeatmapType(type) {
  heatmapType.value = type;
  updateHeatmapChart();
}

// 新增：切换概览数据的日期类型
function setOverviewDayType(type) {
  overviewDayType.value = type;
  // 注意：这里仅更新了状态，实际数据需要根据这个状态变化
  // 你可能需要在这里触发重新获取或计算概览数据的逻辑
}

// 新增：计算属性来模拟动态数据 (实际应用中应从数据源获取)
const pedestrianTotal = computed(() => {
  return overviewDayType.value === 'workday' ? '239' : '370'; // 模拟不同数据
});
const pedestrianTrend = computed(() => {
  return overviewDayType.value === 'workday' ? '+12%' : '+9%'; // 模拟不同趋势
});
const vehicleTotal = computed(() => {
  return overviewDayType.value === 'workday' ? '136' : '234'; // 模拟不同数据
});
const vehicleTrend = computed(() => {
  return overviewDayType.value === 'workday' ? '-5%' : '-1%'; // 模拟不同趋势
});
const peakHours = computed(() => {
  return overviewDayType.value === 'workday' ? '15:00-17:00' : '17:00-19:00'; // 模拟不同高峰
});
const abnormalEvents = computed(() => {
  return overviewDayType.value === 'workday' ? '23' : '15'; // 模拟不同事件数
});
const abnormalTrend = computed(() => {
  return overviewDayType.value === 'workday' ? '+8' : '+5'; // 模拟不同趋势
});

// 组件挂载时初始化图表
onMounted(() => {
  initCharts();
});

// 监听热力图类型变化
watch(heatmapType, (newVal) => {
  updateHeatmapChart();
});

// 监听语言变化，重新渲染图表
watch(locale, () => {
  if (pedestrianChartInstance && vehicleChartInstance && heatmapChartInstance) {
    updatePedestrianChart();
    updateVehicleChart();
    updateHeatmapChart();
  }
});
</script>

<style scoped>
/* MacOS风格CSS */
@font-face {
  font-family: 'SF Pro Text';
  src: local('SF Pro Text'), local('SFProText-Regular');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'SF Pro Display';
  src: local('SF Pro Display'), local('SFProDisplay-Bold');
  font-weight: bold;
  font-style: normal;
}

.data-viz {
  display: flex;
  background-color: #F2F2F7;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  color: #1D1D1F;
}

/* 侧边栏样式 */
.sidebar {
  width: 220px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: saturate(180%) blur(20px);
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.sidebar-header {
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.sidebar-header h3 {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: bold;
  font-size: 17px;
  margin: 0;
  color: #42b983;
}

.sidebar-menu {
  padding: 20px 0;
}

.menu-item {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: background-color 200ms ease;
  border-radius: 6px;
  margin: 0 8px 4px;
  text-decoration: none;
  color: inherit;
}

.menu-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.menu-item.active {
  background-color: rgba(10, 132, 255, 0.1);
}

.menu-item.active svg,
.menu-item.active span {
  color: #42b983;
}

.menu-item svg {
  color: #8E8E93;
}

.menu-item span {
  color: #1D1D1F;
}

/* 主内容区样式 */
.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  position: relative;
}

/* 页面标题 */
.page-title {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: bold;
  font-size: 28px;
  margin: 0 0 20px 0;
  color: #1D1D1F;
}

/* MacOS风格卡片 */
.mac-card {
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: saturate(180%) blur(20px);
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 200ms ease, box-shadow 200ms ease;
}

/* 数据概览卡片样式 */
.data-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.overview-card {
  padding: 20px;
  text-align: center;
  transition: transform 200ms ease;
}

.overview-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.12);
}

.overview-card h3 {
  margin: 0 0 15px 0;
  color: #86868B;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 17px;
  font-weight: 500;
}

.stat {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
  color: #1D1D1F;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.trend {
  font-size: 14px;
}

.trend.up {
  color: #42b983;
}

.trend.down {
  color: #e74c3c;
}

.trend.neutral {
  color: #8E8E93;
}

/* 图表区域样式 */
.chart-container {
  padding: 20px;
  margin-bottom: 30px;
}

.filter-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.date-filter, .day-type-filter {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 5px 0;
}

.date-buttons, .type-buttons {
  display: flex;
  gap: 8px;
}

button {
  padding: 6px 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(160, 160, 160, 0.8);
  border-radius: 6px;
  cursor: pointer;
  transition: all 200ms ease;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
}

button:hover {
  background: rgba(0, 0, 0, 0.04);
}

button.active {
  background: #42b983;
  color: white;
  border-color: #42b983;
}

.charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
}

.chart-wrapper {
  min-height: 300px;
}

.chart-title {
  text-align: center;
  margin-bottom: 15px;
  color: #1D1D1F;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 17px;
}

.chart {
  height: 300px;
  width: 100%;
}

/* 热力图区域 */
.heatmap-section {
  margin-top: 30px;
}

.heatmap-filters {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;
}

.heatmap-chart {
  height: 400px;
  width: 100%;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 900px) {
  .charts {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .data-viz {
    flex-direction: column;
    height: auto;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    padding: 10px 0;
  }
  
  .sidebar-menu {
    display: flex;
    overflow-x: auto;
    padding: 10px 0;
  }
  
  .menu-item {
    white-space: nowrap;
  }
  
  .main-content {
    padding: 10px;
  }
  
  .filter-section {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .carousel-container {
    height: auto;
  }
}

/* 新增：概览数据日期选择器样式 */
.overview-day-selector {
  padding: 10px 20px;
  margin-bottom: 20px; /* 与下方概览卡片的间距 */
  display: flex;
  align-items: center;
  gap: 15px; /* 元素间距 */
  background-color: rgba(255, 255, 255, 0.7); /* 使用卡片背景 */
  backdrop-filter: saturate(180%) blur(20px);
  border-radius: 8px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.overview-day-selector span {
  color: #86868B; /* 标签颜色 */
  font-weight: 500;
}

.overview-day-selector button {
  padding: 5px 10px; /* 按钮尺寸稍小 */
  font-size: 13px;
   /* 继承通用按钮样式，但可以覆盖 */
}

.overview-day-selector button.active {
  background: #42b983; /* 激活颜色 */
  color: white;
  border-color: #42b983;
}

/* 确保概览卡片有足够的上边距 */
.data-overview {
  /* margin-top: 20px; */ /* 如果 .overview-day-selector 没有 margin-bottom，则可能需要这个 */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

/* 社区公共空间诊断与改造样式 */
.space-diagnosis-section {
  padding: 20px;
  margin-bottom: 30px;
}

.section-title {
  text-align: center;
  margin-bottom: 25px;
  color: #1D1D1F;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: bold;
  font-size: 22px;
  position: relative;
}

.section-title:after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #42b983;
  border-radius: 3px;
}

/* 诊断标签页样式 */
.space-diagnosis-tabs {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 15px;
}

.space-diagnosis-tabs button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* 场景筛选器样式 */
.scenario-filters, .strategy-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 25px;
}

.scenario-filters button, .strategy-filters button {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
}

/* Word文档样式段落 */
.document-style {
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.8;
  color: #333333;
  text-align: justify;
  margin-bottom: 25px;
  padding: 25px 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.document-title {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #1D1D1F;
  margin-bottom: 16px;
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 10px;
}

.document-subtitle {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #42b983;
  margin: 20px 0 14px 0;
}

.document-paragraph {
  margin-bottom: 16px;
  text-indent: 2em;
  line-height: 1.8;
  font-size: 15px;
}

.document-paragraph:last-child {
  margin-bottom: 0;
}

.document-highlight {
  font-weight: 600;
  color: #42b983;
}

/* 摄像头列表样式 */
.camera-list {
  margin: 24px 0;
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid #42b983;
}

.camera-list h4 {
  margin-top: 0;
  margin-bottom: 12px;
  color: #1D1D1F;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 16px;
}

.camera-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.camera-chip {
  padding: 6px 12px;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  font-size: 13px;
  cursor: pointer;
  transition: all 200ms ease;
}

.camera-chip:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.camera-chip.active {
  background-color: #42b983;
  color: white;
  border-color: #42b983;
}

/* 场景图片区域样式 */
.scenario-images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin-top: 30px;
}

.image-section {
  margin-bottom: 25px;
}

.image-section h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #1D1D1F;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 1px dashed #e0e0e0;
  padding-bottom: 8px;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 15px;
}

.gallery-item img, .rendering-item img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease;
}

.gallery-item img:hover, .rendering-item img:hover {
  transform: scale(1.03);
}

.image-caption {
  margin-top: 8px;
  color: #666;
  font-size: 13px;
  text-align: center;
  font-style: italic;
}

/* 每日数据图片样式 */
.daily-data {
  grid-column: span 2;
}

.daily-data-container {
  text-align: center;
}

.daily-data-container img {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

/* 设计效果图样式 */
.design-images {
  margin-top: 25px;
}

.rendering-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* 空间总图样式 */
.masterplan {
  padding: 15px;
}

.masterplan-images {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.masterplan-item {
  text-align: center;
}

.masterplan-item h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #1D1D1F;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 18px;
  position: relative;
  display: inline-block;
}

.masterplan-item h4:after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #42b983;
}

.masterplan-item img {
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.15);
}

.masterplan-caption {
  margin-top: 12px;
  color: #666;
  font-size: 14px;
  font-style: italic;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .scenario-images {
    grid-template-columns: 1fr;
  }
  
  .daily-data {
    grid-column: span 1;
  }
  
  .image-gallery, .rendering-gallery {
    grid-template-columns: 1fr;
  }
  
  .space-diagnosis-tabs {
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  
  .scenario-filters button, .strategy-filters button {
    font-size: 12px;
    padding: 6px 10px;
  }
  
  .document-style {
    padding: 20px 15px;
  }
}

/* 动画效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 增强Word文档样式 */
.document-content {
  margin-top: 20px;
  padding: 20px 25px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  text-align: left;
}

.document-paragraph {
  text-indent: 2em;
  line-height: 2;
  margin-bottom: 16px;
  color: #333333;
  font-size: 15px;
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', sans-serif;
  text-align: justify;
  hyphens: auto;
  letter-spacing: 0.3px;
}

.document-paragraph:last-child {
  margin-bottom: 0;
}

.masterplan-caption {
  display: none; /* 隐藏原来的简单描述 */
}

.masterplan-item {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eaeaea;
}

.masterplan-item:last-child {
  border-bottom: none;
}

.masterplan-item h4 {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #1D1D1F;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
  padding-bottom: 8px;
}

.masterplan-item h4:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #42b983;
  border-radius: 1.5px;
}

.masterplan-item img {
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.masterplan-item img:hover {
  transform: scale(1.02);
}

@media (max-width: 768px) {
  .document-content {
    padding: 15px;
  }
  
  .document-paragraph {
    font-size: 14px;
    line-height: 1.8;
  }
}
</style> 