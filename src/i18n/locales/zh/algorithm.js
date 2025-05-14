export default {
  title: '算法与应用场景说明',
  yoloIntro: {
    title: 'YOLOv5算法介绍',
    description1: 'YOLOv5是一种先进的实时目标检测算法，由Ultralytics开发，在计算机视觉领域广泛应用。YOLO系列算法以其高效率和准确性而著名，能够在单一网络前向传递中同时预测多个目标的类别和位置。',
    description2: '本项目采用YOLOv5作为核心算法，在社区监控视频中检测行人和车辆，实现社区时空行为的精准分析。相较于传统方法，YOLOv5具有以下优势：',
    advantages: {
      accuracy: '更高的检测精度与速度平衡',
      network: '优化的网络结构，支持实时视频分析',
      features: '强大的特征提取能力，适应复杂环境',
      models: '丰富的预训练模型，支持多种目标检测任务'
    },
    imageAlt: 'YOLOv5架构图',
    imageCaption: 'YOLOv5模型架构示意图'
  },
  samplingMethods: {
    imagePath: 'System_architecture/data_accept_zh.svg',
    title: '数据采样方法与应用场景',
    intro: '本研究根据不同的应用需求，设计了四种数据采样方法，分别适用于不同的应用场景：',
    c1f1: {
      title: '单视角单时刻',
      tag: 'c1f1',
      description: '单一摄像头的单帧图像分析，主要用于局部高响应任务，需要快速反应的场景。',
      implementation: '技术实现',
      implementationDesc: '通过YOLOv5实时处理摄像头视频流的单帧图像，识别特定目标并触发相应反应。',
      applications: '应用场景',
      app1: '电动车警告：检测非机动车道上的电动车，实时发出警告',
      app2: '明火侦测：检测公共区域的明火情况，及时预警',
      app3: '非法入侵：监测特定区域的人员进入情况',
      imageAlt: '单视角单时刻示例'
    },
    c1fn: {
      title: '单视角多时刻',
      tag: 'c1fn',
      description: '单一摄像头的连续多帧或多时段数据分析，用于跟踪局部区域的活动变化趋势。',
      implementation: '技术实现',
      implementationDesc: '对同一摄像头在不同时间点的视频数据进行目标检测，并将结果进行时间序列分析。',
      applications: '应用场景',
      app1: '人车流量采样：统计特定区域一段时间内的人车流量变化',
      app2: '活动规律分析：探索社区活动的时间规律，如上下班高峰期',
      app3: '异常行为监测：识别与常规模式不符的异常活动',
      imageAlt: '单视角多时刻示例'
    },
    cmf1: {
      title: '多视角单时刻',
      tag: 'cmf1',
      description: '多个摄像头在同一时间点的数据分析，用于构建社区空间活动的立体视图。',
      implementation: '技术实现',
      implementationDesc: '整合多个摄像头在同一时刻的检测结果，利用空间映射技术建立三维场景模型。',
      applications: '应用场景',
      app1: '三维场景建模：构建社区活动的空间分布模型',
      app2: '全局态势感知：提供社区全局视角的实时状况',
      app3: '盲区弥补：通过多角度数据融合减少监控盲区',
      imageAlt: '多视角单时刻示例'
    },
    cmfn: {
      title: '多视角多时刻',
      tag: 'cmfn',
      description: '多个摄像头在不同时间点的综合数据分析，用于全面理解社区时空活动模式。',
      implementation: '技术实现',
      implementationDesc: '整合多摄像头长时间数据，结合时空数据挖掘技术，构建完整的社区活动时空模型。',
      applications: '应用场景',
      app1: '全局数据分析：社区层面的活动规律与模式挖掘',
      app2: '预测性分析：基于历史数据预测未来活动趋势',
      app3: '群聚行为侦测：识别社区中的群体活动模式与异常聚集',
      imageAlt: '多视角多时刻示例'
    }
  },
  workflow: {
    title: '技术实现流程',
    steps: {
      step1: {
        title: '数据采集',
        description: '从社区摄像头获取视频流数据'
      },
      step2: {
        title: '图像预处理',
        description: '图像增强、裁剪与归一化'
      },
      step3: {
        title: 'YOLOv5检测',
        description: '检测行人、车辆及异常情况'
      },
      step4: {
        title: '数据后处理',
        description: '轨迹跟踪、数据清洗与统计'
      },
      step5: {
        title: '时空分析',
        description: '构建时空行为模型与预测'
      }
    }
  },
  advantages: {
    title: '技术优势与创新',
    items: {
      accuracy: {
        title: '高精度识别',
        description: '采用最新YOLOv5算法，人车识别准确率达95%以上，适应各种光照和天气条件'
      },
      realtime: {
        title: '实时处理',
        description: '优化的推理引擎支持实时视频流处理，延迟低于100ms，满足监控预警需求'
      },
      multiDimension: {
        title: '多维度分析',
        description: '集成时间和空间维度的多模态数据分析，提供全方位社区活动视图'
      },
      visualization: {
        title: '可视化展示',
        description: '直观的数据可视化界面，支持多终端访问，便于管理人员理解和使用'
      },
      privacy: {
        title: '隐私保护',
        description: '内置数据脱敏处理，确保在进行数据分析时保护社区居民隐私'
      },
      extensibility: {
        title: '系统拓展性',
        description: '模块化设计与开放API，便于与其他智慧社区系统集成和功能扩展'
      }
    }
  },
  exploration: {
    title: '项目深度探索',
    description: '通过以下链接，您可以深入了解本项目的更多细节。查看项目的三维模型可视化和详细数据分析，获取更全面的社区改造信息。',
    model3d: {
      title: '3D模型场景',
      description: '了解项目更多细节'
    },
    dataViz: {
      title: '数据可视化',
      description: '了解项目数据内容'
    }
  }
}
