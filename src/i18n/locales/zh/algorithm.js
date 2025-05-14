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
    researchFramework: {
      title: '研究框架',
      multiSource: {
        title: '基于多源数据驱动的城市更新智能化应用方法',
        description: '多源数据的城市更新智能化应用方法通过数据采集、数据分析和数据决策对相关的城市更新任务进行分析。在数据采集层面，通过不同终端和设备的方法进行全周期各要素数据之间的采集；在数据分析层面，通过具体改造设计的场景可分为人员流动情况分析、功能情况分析和基本调研情况。如：对现有功能的满意度调查、基础设施的完备程度调查等。在城市管理场景中，可以对空间管理情况和城市空间是否拥挤等方面进行分析。基于上述分析，则可以准确给出在设计决策层面的建议：如改造设计的位置、适宜的设计手法、改造空间的具体的功能选择等。在动态管理评估方面则可以给出停车管理、人车控流、空间管理等问题的建议。'
      },
      videoData: {
        title: '基于视频数据的城市更新智能化应用方法',
        description1: '基于视频数据的城市更新智能化应用方法由视频数据采集、视频数据分析和视频数据决策所组成。在数据采集层面，通过对城市空间进行全域数据采集布点及其增设做到对既有空间的感知；并且通过前端网络的视觉识别和相关的数据统计算法进行数据清理和预处理。一般在视频数据中需要处理人、车、物的识别任务，视频中各物体之间的运动关系和位置变化量等信息，为了更全面的感知数据，则通过7*24小时将实时采集相关的视频数据。在数据分析部分，通过对区域内人车流量的计数和对象的轨迹追踪，提出基于人流、车流的设计评估的指标方法、构建相关的指标体系，如：小区内的空间使用率、空间活力度等指标，通过此指标研判区域内空间的使用功能。数据决策层面则分为设计决策建议和动态管理评估两个方面，根据不用的城市更新改造设计的具体场景，可以为老旧小区改造中提供公共空间改造和功能位置的具体建议，提供加装基础设施点位和小区快递点的选址意见。而对于城市历史街区改造设计和工业遗址改造设计，则可以根据相应场景空间上的语义分析得出具体的重建或保留参考建议。在动态管理评估方面，则可以根据城市空间拥堵情况、停车区域管理和城市空间管理情况来得出具体的管理意见，如：机动车和非机动车的停车管理是否存在违规停车。人车流控制管理上是否存在车道拥堵的情况，公共空间是否存在占道等情况进行预警和处理。',
        description2: '该方法支持对大规模城市视频数据的有效处理，确保数据质量并为后续的智能分析提供可靠基础。'
      },
      flowcharts: {
        videoTitle: '视频数据的城市更新智能化应用方法',
        videoDesc: '基于视频数据的多维度城市更新应用框架',
        multiSourceTitle: '多源数据驱动的城市更新智能化应用',
        multiSourceDesc: '整合多源数据的城市更新决策支持系统'
      }
    },
    perceptionSystem: {
      summaryImagePath: 'System_architecture/summary_zh.svg',
      title: '基于视频数据的高境新苑-社区更新智能人车流感知系统应用',
      overviewTitle: '应用概述',
      overview1: '基于视频数据的高境新苑-社区更新智能人车流感知系统是一套综合性智能监测平台，通过部署在社区内的既有的高清摄像头网络，实时采集社区内的人车流动态信息，并通过目标检测的AI算法进行分析处理，为社区规划与更新提供数据支持。',
      overview2: '系统采用分布式架构，通过边缘计算与云端服务器相结合的方式，确保数据处理的高效性与准确性。摄像头采集的原始数据经过预处理后，由YOLOv5目标检测算法识别画面中的行人与车辆，实现对人车流的完整记录与分析。',
      summaryImageAlt: '人车流感知系统界面',
      summaryImageCaption: '(人车流监测系统实时界面(如果加载不出，可以科学上网试一下))'
    },
    systemArchitecture: {
      title: '系统架构',
      architectureImageAlt: '系统架构图',
      architectureImagePath: 'System_architecture/architecture_zh.png',
      perception: {
        imagePath: 'System_architecture/sentor_layer_zh.jpeg',
        title: '感知层',
        description: '摄像头与视频数据采集',
        buttonShow: '查看详情',
        buttonHide: '收起详情',
        detailTitle: '感知层详细结构',
        imageAlt: '感知层架构图',
        detail1: '感知层是整个系统的基础架构组件，负责通过摄像头等设备收集城市场景的实时数据。作为系统的前端入口，感知层构建了一个全方位的数据采集网络，确保系统能够获取高质量、全覆盖的城市空间信息流。在高境新苑社区实施过程中，我们布置了战略性的采集节点，形成了一个高效的感知网络。',
        detail2: '该层包含以下关键组件：',
        components: {
          data: '数据采集设备：包括既有固定或球型网络摄像机（支持高清上传与定时抓拍），并依据空间方位、视场角度及人车流线，将设备成对或对称地布设于楼道、单元入口与转角等关键位置，以消除盲区并实现老旧小区全域覆盖',
          video: '视频流处理单元：处理原始视频流，进行预处理和抽帧采样，将识别模型部署在前端摄像头，提高数据的私密性和第三方数据的使用效率。',
          server: '政府服务器：基于高速网络的实时数据传输，支持有线和无线连接，构建了低延迟、高带宽的传输网络，确保数据的实时性。'
        },
        conclusion: '感知层采用分层设计，将数据采集与初步处理紧密结合，大幅降低了数据传输量，同时提高了系统抗干扰能力，为后续的深度分析奠定了坚实基础。'
      },
      analysis: {
        imagePath: 'System_architecture/alayzise_layer_zh.png',
        title: '分析层',
        description: '视频数据分析、人车流统计、停车/非法行人判定',
        buttonShow: '查看详情',
        buttonHide: '收起详情',
        detailTitle: '分析层详细结构',
        imageAlt: '分析层架构图',
        detail1: '分析层是系统的核心智能单元，负责对感知层采集的原始数据进行深度处理和分析，提取有价值的信息。该层采用多级处理架构，结合深度学习与传统算法，实现了对复杂场景的精确解析与理解。在实际部署中，分析层通过云端与边缘协同计算模式，既保证了处理效率，又兼顾了实时性需求。',
        detail2: '分析层主要功能模块包括：',
        components: {
          objectDetection: '目标检测与跟踪：使用YOLOv5算法识别视频中的人、车等移动目标，检测准确率达94%以上。',
          behaviorAnalysis: '行为分析模块：分析目标的运动轨迹，判断是否存在异常行为，能够识别逗留、聚集、异常路径等多种行为模式，为空间使用评估提供依据。',
          spaceAnalysis: '空间利用分析：统计人流量、车流量，计算空间使用率，生成时空热力图，直观展示社区不同区域的活跃度与使用模式。',
          parkingSystem: '停车判定系统：基于阈值掩模与面积比计算，判定车辆是否处于停车状态，支持合法与非法停车的区分，为停车管理提供数据支持。',
          visualization: '数据可视化中心：以图表、热力图等形式直观呈现分析结果，提供多维度的数据展示，支持时间、空间维度的交互查询。'
        },
        conclusion: '分析层采用模块化设计，各功能单元既能独立运行，又可协同工作，形成完整的分析链条。通过持续的算法优化与模型更新，分析层的智能水平不断提升，为决策层提供越来越精准的数据支持。'
      },
      execution: {
        imagePath: 'System_architecture/action_layer_zh.png',
        title: '执行层',
        description: '日常管理、设施改造',
        buttonShow: '查看详情',
        buttonHide: '收起详情',
        detailTitle: '执行层详细结构',
        imageAlt: '执行层架构图',
        detail1: '执行层是系统的决策输出单元，基于分析结果，制定并实施相应的管理策略和改造方案。该层将数据分析转化为实际行动，通过智能推荐与人机协作，提升社区管理效率与空间品质。',
        detail2: '执行层主要包括以下功能模块：',
        components: {
          dailyManagement: {
            title: '日常管理模块：',
            parking: '停车管理：根据车辆违停情况，自动推送提醒或通知管理人员，支持历史记录查询与统计分析，形成闭环管理。',
            flow: '人流控制：当人流密度超过安全阈值时，触发预警机制，提供分流建议，预防拥挤风险，确保社区公共空间安全。',
            green: '绿地空间管理：检测绿地空间非法占用情况，保障绿地空间绿化生态，对不合理占用进行记录与管理，维护社区环境秩序。'
          },
          renovation: {
            title: '设施改造模块：',
            space: '公共空间优化：基于空间使用数据，提出改造方案和位置建议，针对不同人车流特征区域提供差异化设计策略。',
            infrastructure: '基础设施规划：确定新增设施的最佳位置，如快递站点、休息区等，最大化设施服务效率与覆盖范围。',
            decision: '决策支持系统：整合多种分析结果，为管理者提供全面的决策依据，包括数据报表、趋势预测和方案比对，支持科学决策。'
          }
        },
        conclusion: '执行层采用"推荐+干预"的工作模式，既能提供智能化的决策建议，又保留人为干预的可能性，实现人机协同的管理方式。通过与社区居民的持续互动与反馈收集，执行层的决策质量不断提升，形成自我优化的良性循环。'
      }
    },
    techDetails: {
      title: '技术详情',
      tabs: {
        detection: '检测与跟踪',
        parking: '停车判定',
        greenspace: '绿地闯入检测',
        digital: '数字孪生'
      },
      detectionTracking: {
        imagePath: 'technology/YOLOv5_dectection.jpeg',
        title: 'YOLOv5目标检测与数据感知系统',
        paragraph1: '本项目采用YOLOv5算法进行目标检测，并结合7*24小时的数据采集实现对多场景的的持续跟踪和优化，构建了一套全天候高效、精准的视频分析系统。相比传统方法，本系统在性能与精度上取得了显著提升，为社区人车流监测提供了可靠的技术支持。',
        paragraph2: '系统主要特点包括：',
        features: {
          realtime: '实时处理：每秒可处理25+帧，满足实时监控需求，即使在边缘计算设备上也能保持良好性能。',
          accuracy: '高精度检测：行人与车辆检测准确率>94%，在复杂背景和光照条件下仍能保持稳定表现。'
        },
        paragraph3: '在实际的项目部署中，我们针对社区环境特点对模型进行了优化，提高了对小目标和部分遮挡目标的识别能力，记录各个摄像头节点的人车数量统计，为城市更新决策提供了可靠的数据支撑。',
        imageAlt: 'YOLOv5检测效果图',
        imageCaption: 'YOLOv5检测效果'
      },
      parkingDetection: {
        imagePath: 'technology/parking_detection_zh.png',
        title: '基于阈值掩模的停车状态判定',
        paragraph1: '本项目开发了一套基于阈值掩模的停车状态判定算法，用于精确识别社区内的车辆停放状态。该算法结合空间位置和时间持续性双重约束，有效解决了传统方法在复杂场景下误判率高的问题。算法主要通过以下步骤实现停车状态的精确判定：',
        steps: {
          step1: {
            title: '1. 定义停车区域掩模',
            content: '在系统中预先定义停车区域的掩模图像Mask，表示允许停车的区域范围。这一步骤通过人工标注结合自动生成的方式完成，确保掩模的精确性与完整性。对于社区内的不同功能区域，我们设置了差异化的停车规则，通过掩模属性进行区分，提高了判定的适应性。'
          },
          step2: {
            title: '2. 检测车辆位置',
            content: '实时检测每一帧视频中的车辆位置P(x,y)，获取车辆的边界框坐标。这一步骤利用YOLOv5进行高效目标检测，系统能够适应不同光照条件和部分遮挡情况，保证检测的可靠性。'
          },
          step3: {
            title: '3. 计算重合度',
            content: '计算车辆边界框与停车区域掩模的重合度 α = Area(P ∩ Mask) / Area(P)，即车辆与停车区域的交集面积除以车辆总面积。这一指标反映了车辆在停车区域内的占比情况，是判定停车状态的关键参数。算法采用高效的像素计算方法，确保实时性能。'
          },
          step4: {
            title: '4. 判定停车状态',
            content: '当 α > 阈值T 且持续时间 > 时间阈值τ时，判定为停车状态。这确保了车辆确实在停车区域内且已停留足够长时间。双重阈值机制有效过滤了临时停靠和路过车辆，提高了判定的准确性。通过实验验证，最佳阈值T设置为0.75，时间阈值τ为15秒，在实际应用中取得了良好效果。',
            formula: '停车状态 = { True, if α > T and t > τ\nFalse, otherwise'
          }
        },
        imageAlt: '停车判定示意图',
        imageCaption: '停车判定算法示意图'
      },
      greenspace: {
        imagePath: 'technology/illegal-pedestrian-detection_zh.png',
        title: '绿地非法行人判断',
        paragraph1: '本项目开发了一套绿地非法行人闯入检测算法，通过视频监控与人工智能技术精确识别社区内绿地区域的非法闯入行为，提升绿地保护效果与社区环境品质。该系统采用区域限定与行为分析相结合的方法，确保在保护环境的同时不影响居民正常活动。',
        paragraph2: '系统工作原理如下：',
        steps: {
          step1: {
            title: '1. 绿地区域界定',
            content: '结合实地考察，精确划定社区内的绿地保护区域，制作掩模图像Mask。'
          },
          step2: {
            title: '2. 人员实时检测',
            content: '系统利用改进的YOLOv5模型对监控画面中的行人进行实时检测，获取行人脚部位置P(x,y)，检测人的脚部是否在绿地范围内。'
          },
          step3: {
            title: '3. 行为分析与判定',
            content: '系统不仅检测行人位置（脚部位置），还分析其行为模式。通过计算行人与绿地区域的重合度β = Area(P ∩ GreenMask) / Area(P)及其停留时间t，结合行为特征（如坐卧、采摘等），综合判断是否属于非法闯入。',
            formula: '闯入等级 = f(β, t, 行为类型, 人数)\n其中β为区域重合度，t为停留时间'
          },
          step4: {
            title: '4. 响应与记录机制',
            content: '检测到闯入行为后，系统记录事件并在管理界面显示并向管理人员发送实时警报，并记录完整的视频证据。所有事件均被记入数据库，形成热力图，帮助管理人员识别频发区域，进行有针对性的防护措施加强。'
          }
        },
        imageAlt: '绿地闯入检测示意图',
        imageCaption: '绿地非法闯入检测实例'
      },
      digital: {
        imagePath: 'technology/data_twins.png',
        title: '数字孪生可视化技术',
        paragraph1: '本项目构建了一套高精度的社区数字孪生系统，实现了虚拟与现实的精准映射。系统通过三维可视化技术将复杂的数据分析结果直观呈现，为城市更新决策提供了直观、全面的可视化支持。该系统采用多源数据融合技术，确保虚拟模型与现实环境的高度一致性。',
        paragraph2: '系统主要采用以下技术构建：',
        features: {
          photogrammetry: '倾斜摄影：通过无人机多角度拍摄获取社区真实纹理数据，捕捉建筑、道路和植被等物理环境的细节，确保数字模型的真实感。',
          rendering: '实时渲染：基于Three.js实现高性能Web端3D模型渲染，支持在普通浏览器中流畅运行。',
          fusion: '数据融合：将实时检测与分析数据映射到3D场景中，包括人车流热力图、空间利用率分析和异常事件标记等，实现数据的空间化展示。',
          interaction: '交互功能：支持旋转、缩放、平移、点选等交互操作，用户可自由探索社区空间，查询特定区域的数据指标和改造建议。'
        },
        imageAlt: '数字孪生模型',
        imageCaption: '社区数字孪生可视化效果'
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
    },
    flowcharts: {
      videoData: {
        title: "视频数据的城市更新智能化应用方法",
        dataCollection: "视频数据采集",
        dataAnalysis: "视频数据分析",
        dataDecision: "视频数据决策",
        dataCollectionSub: "视频数据采集",
        realTimeData: "7×24小时的实时数据采集法",
        fullAreaData: "全域数据采集布点及其增设",
        frontendRecognition: "前端网络的视觉识别",
        dataPreprocessing: "数据清理和预处理",
        dataAnalysisSub: "视频数据分析",
        trafficFlow: "区域内人车流量",
        spaceUsage: "区域内空间实际使用率和功能",
        semanticAnalysis: "历史街区、场景空间语义分析",
        designDecision: "设计决策建议",
        dynamicManagement: "动态管理评估",
        designDecisionSub: "设计决策建议",
        communityRenovation: "老旧小区改造",
        historicRenovation: "建筑历史街区改造",
        industrialRenovation: "工业遗址改造",
        publicSpaceRenovation: "公共空间改造的功能和位置",
        infrastructureAdd: "加装基础设施点位",
        deliveryStation: "小区快递点选址",
        historicEvaluation: "建筑历史空间评估",
        industrialEvaluation: "工业遗址空间评估",
        dynamicManagementSub: "动态管理评估",
        parkingManagement: "停车区域管理",
        trafficControl: "人车流控制和管理",
        congestionStatus: "城市空间拥堵情况",
        publicSpaceOccupation: "公共空间占道",
        nonMotorManagement: "非机动车管理"
      },
      multiSource: {
        title: "多源数据驱动的城市更新智能化应用",
        dataCollection: "数据采集",
        dataAnalysis: "数据分析",
        dataDecision: "数据决策",
        fixedDevicesSub: "固定设备数据采集",
        fixedDevices: "固定设备数据采集",
        cameraData: "摄像头数据",
        accessData: "门禁数据",
        electricityData: "电表数据",
        poiData: "POI 数据",
        mobileDevicesSub: "移动设备数据采集",
        mobileDevices: "移动设备数据采集",
        lbsData: "LBS 数据",
        internetData: "互联网时令数据",
        gpsData: "GPS 数据",
        dataCollectionSub: "数据采集",
        designScenariosSub: "具体改造设计场景",
        designScenarios: "具体改造设计场景",
        personnelFlow: "人员流动情况分析",
        functionSatisfaction: "功能满足情况分析",
        basicSurvey: "基本调研情况",
        managementScenariosSub: "具体城市管理场景",
        managementScenarios: "具体城市管理场景",
        spaceManagement: "空间管理情况",
        spaceCongestion: "城市空间是否拥堵",
        dataAnalysisSub: "数据分析",
        designDecisionSub: "设计决策建议",
        designDecision: "设计决策建议",
        designLocation: "改造设计的点位",
        designMethod: "改造设计的设计手法",
        spaceFunction: "改造空间的功能选择",
        dynamicManagementSub: "动态管理评估",
        dynamicManagement: "动态管理评估",
        parkingManagementIssue: "停车管理问题",
        trafficControlIssue: "人车流控制问题",
        spaceManagementIssue: "空间管理问题",
        dataDecisionSub: "数据决策"
      }
    }
}
