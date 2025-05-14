export default {
  title: '3D社区可视化',
  loading: {
    text: '正在加载',
    notice: '3D模型加载需要较长时间，请耐心等待。并且加载后需再次点击按钮。[如果您是中国大陆用户，请科学上网后才能加载这个模型]'
  },
  panels: {
    layerControl: {
      title: '图层控制',
      buildings: '建筑物',
      roads: '道路',
      cameras: '摄像头位置',
      visionLines: '摄像头视线线段',
      visionPlane: '摄像头视野平面',
      trees: '树木',
      visionPoints: '视线投影点',
      data: '数据热点'
    },
    viewControl: {
      title: '视角控制',
      resetView: '重置视角',
      wireframeOn: '开启线框模式',
      wireframeOff: '关闭线框模式'
    },
    dataDisplay: {
      title: '数据显示',
      noData: '无数据',
      pedestrian: '行人流量',
      vehicle: '车辆流量',
      combined: '综合数据'
    },
    timeSelect: {
      title: '时间选择',
      workday: '工作日',
      weekend: '休息日',
      morning: '早高峰',
      noon: '午间',
      evening: '晚高峰',
      night: '夜间'
    },
    instructions: {
      title: '操作说明',
      rotate: '鼠标左键：旋转视图',
      pan: '鼠标右键：平移视图',
      zoom: '滚轮：缩放视图',
      click: '点击物体：查看详细信息'
    },
    infoPanel: {
      title: '信息面板',
      clickToView: '点击查看详细信息',
      type: '类型',
      position: '位置',
      status: '状态',
      online: '在线',
      offline: '离线',
      viewData: '查看数据',
      showVision: '显示视线',
      hideVision: '隐藏视线'
    },
    statistics: {
      title: '数据统计',
      pedestrianTotal: '行人总数',
      vehicleTotal: '车辆总数',
      cameraStatus: '摄像头',
      onlineRatio: '在线/总数',
      accumulative: '累计'
    },
    realTimeData: {
      title: '实时数据监控',
      pedestrianCount: '行人数量',
      vehicleCount: '车辆数量',
      totalCount: '总数量',
      timeUnit: '时间（小时）'
    }
  },
  objectTypes: {
    building: '建筑物',
    road: '道路',
    camera: '摄像头',
    data: '数据节点',
    tree: '树木'
  },
  dataTypes: {
    pedestrian: '行人流量',
    vehicle: '车辆流量',
    combined: '综合数据'
  }
}
