export default {
  title: '社区数据分析与可视化',
  overview: {
    pedestrianTotal: '行人总数',
    vehicleTotal: '车辆总数',
    peakHours: '高峰期',
    abnormalEvents: '异常事件',
    weekCompare: '较上周',
    workday: '工作日',
    weekend: '休息日'
  },
  filters: {
    dayType: '日期类型',
    all: '全部',
    workday: '工作日',
    weekend: '休息日',
    viewData: '查看数据'
  },
  charts: {
    pedestrianDistribution: '人流量时间分布',
    vehicleDistribution: '车流量时间分布',
    communityHeatmap: '社区活动热力图',
    pedestrian: '行人',
    vehicle: '车辆',
    timeUnit: '时间（小时）',
    personCount: '人数',
    vehicleCount: '车辆数',
    coordinate: '坐标',
    value: '值'
  },
  camera: {
    title: '摄像头监控画面',
    prev: '上一张',
    next: '下一张',
    time: '时间',
    location: '位置',
    detections: '检测对象',
    noImages: '无可用图像',
    workday: '工作日',
    weekend: '休息日'
  },
  spaceDiagnosis: {
    title: '社区公共空间诊断与改造',
    classification: '不同人车特征下的公共空间分类',
    strategy: '改造设计策略',
    masterplan: '改造后的空间总图',
    representative: '代表性摄像头',
    illegalPedestrians: '识别非法人的照片',
    parking: '识别停车的照片',
    dailyData: '当天的数据照片',
    targetAreas: '目标区域',
    redesignRenderings: '改造效果图',
    analysisMap: '空间分析总图',
    designMap: '空间改造总图',
    masterplanTitle: '社区改造总体方案',
    masterplanDescription: '基于对社区不同区域人车流动的监测与分析，我们对高景新苑社区进行了全面的空间诊断，识别出不同特征的区域，并提出针对性的改造方案。本总图展示了诊断与改造的整体规划，从空间使用特征到具体设计策略，形成完整的社区公共空间改造体系。',
    analysisMapAlt: '社区空间分析总图',
    analysisDescription: '对社区不同功能区域的人车流分析和空间特征诊断是本项目的核心分析工作。通过Yolov5模型检测和数据采集分析技术，我们对高景新苑社区进行了全天候监测。根据人车流量的不同分布特征，将社区内公共空间划分为四类场景，在总图上进行了示例。',
    designMapAlt: '社区改造设计总图',
    designDescriptionPart1: '基于人车流分析的社区公共空间综合改造方案是将数据分析转化为实际设计策略的关键环节。我们的设计团队根据前期数据分析结果，制定了全面系统的空间优化策略。',
    designDescriptionPart2: '方案充分考虑了不同区域的使用特征和功能需求，提出四类优化策略：对于人少车多区域，主要采用停车空间规范化设计；对于低利用率区域，着力于景观提升和生态功能强化；对于人流高峰区域，创造多元化活动空间；对于时段错峰区域，设计灵活可变的功能组件。'
  },
  scenarios: {
    imageCaption: {
      pedestrianDetection: '行人检测与统计',
      parkingDetection: '停车检测',
      noParkingDetection: '无相关车辆',
      dailyData: '24小时车辆人流统计图（图例中的CameraID比3D场景中的ID序列多一个单位偏移，所以这里显示的CameraID为08，实际为Camera-07）',
      peakTimeData: '人车流量时间错峰分布图（图例中的CameraID比3D场景中的ID序列多一个单位偏移，所以这里显示的CameraID为08，实际为Camera-07）'
    },
    highVehicleLowPedestrian: {
      name: '人少车多场景',
      description: '这类区域通常为社区内部的道路或停车区域，行人活动有限，但车流和停车需求高，导致空间主要被机动车占据。以下是代表性摄像头，其中图片为Camera-07的内容。',
      strategy: {
        title: '设计为可空间适应化停车区域',
        description: '根据人车流数据分析，该场景适合优化为规范化停车区域。设计方案通过合理规划停车空间尺寸，最大化有限空间的使用率；建立明确的车行与人行分区，确保行人安全；增加绿化隔离带，提升停车环境的视觉体验。其中改造图片为Camera-07的设计内容。',
        image1: '停车空间优化设计',
        image2: '改造后的停车区域预览'
      }
    },
    lowVehicleLowPedestrian: {
      name: '人少车少场景',
      description: '这类区域通常位于社区边缘或功能性较弱的过渡空间，人车活动均较少，空间利用率低下，存在较大的改造潜力。以下是代表性摄像头，其中图片为Camera-29的内容。',
      strategy: {
        title: '增加景观小品，增强绿地率',
        description: '针对人车流量均较低的空间，改造策略以提升环境品质和生态价值为主。设计引入垂直绿化架构，增加绿植覆盖；布置景观小品提升空间美观度；采用可生长的设计理念，为未来空间功能演变留有余地。其中改造图片为Camera-29的设计内容。',
        image1: '景观小品设计',
        image2: '改造后的绿意盎然空间效果'
      }
    },
    highPedestrianLowVehicle: {
      name: '人多车少场景',
      description: '主要是社区内的活动中心区域，居民聚集度高，行人流量大，但车辆较少经过或停放，适合发展以人为本的活动空间。以下是代表性摄像头，其中图片为Camera-08的内容。',
      strategy: {
        title: '设计更多人休憩空间，如健身空间和文化长廊、儿童活动',
        description: '针对人流量大而车辆稀少的空间，改造重点是创造多元化的人本活动场所。设计包括分龄段的健身设施区域；融入社区文化元素的景观长廊；适合儿童游戏的安全活动空间；以及灵活多变的社区聚会场所，满足不同居民群体的需求。其中改造图片为Camera-08、Camera-14、Camera-22的设计内容。',
        image1: '社区健身活动共享空间设计方案',
        image2: '社区健身活动空间效果图',
        image3: '社区儿童活动空间效果图',
        image4: '社区文化长廊鸟瞰效果图',
        image5: '社区文化长廊空间效果图'
      }
    },
    alternatePeaks: {
      name: '高低峰错开',
      description: '这类区域呈现出时间分布特征，在一天中的不同时段分别表现为人流高峰或车流高峰，空间使用呈现明显的时间差异。以下是代表性摄像头，其中图片为Camera-33的内容。',
      strategy: {
        title: '设计车走后人休息的构筑物，提供活动桌椅及设施',
        description: '针对人车流错峰使用的特性，设计采用时间弹性策略。改造方案包括可折叠或移动的活动设施，在车辆离开后快速展开；模块化的休闲桌椅系统，便于根据使用需求灵活组合；以及智能照明系统，根据活动时段自动调整亮度和范围，最大化空间的时间利用效率。其中改造图片为Camera-33的设计内容。',
        image1: '错峰使用的活动空间设计方案',
        image2: '可变构筑物与灵活座椅配置效果'
      }
    }
  }
}
