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
      },
      cameraModal: {
        title: '摄像头详情',
        id: '编号',
        location: '位置',
        status: '状态',
        manufacturer: '制造商',
        installDate: '安装日期',
        resolution: '分辨率',
        type: '类型',
        coverage: '覆盖范围',
        viewAngle: '视角'
      },
      siteplan: {
        title: '基地总体平面图',
        normal: '平面图',
        satellite: '卫星图',
        normalBtn: '平面图',
        satelliteBtn: '卫星图'
      },
      realTimeMonitor: {
        title: '实时数据监控(示例)'
      }
    },
    modal: {
      camera: {
        title: '摄像头数据',
        liveTab: '摄像头画面(实时样式)',
        maskTab: '摄像头Mask区域（行人检测）',
        yoloTab: 'yolov5处理后画面（行人检测）',
        time: '时间',
        dataTab: '历史数据(示例)',
        pedestrianCount: '行人数量',
        vehicleCount: '车辆数量',
        illegalPedestrians: '非法行人数量（绿化区禁止进入）',
        illegalVehicles: '非法停车车辆数量（禁止停车区域）',
        resolutionTitle: '摄像头分辨率',
        modelTitle: '摄像头型号',
        manufacturerTitle: '制造商',
        installationDateTitle: '安装日期',
        fovTitle: '视场角度',
        dataButtonText: '数据曲线',
        liveButtonText: '实时监控',
        detectionButtonText: '检测记录'
      },
      siteplan: {
        title: '社区平面图',
        normal: '平面图',
        satellite: '卫星图'
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
    },
    charts: {
      cameraDetectionTitle: '摄像头检测数据统计',
      pedestrianCount: '行人数量',
      vehicleCount: '车辆数量',
      timeAxis: '时间',
      countAxis: '数量'
    },
    detection: {
      pedestrian: '行人',
      vehicle: '车辆',
      time: '时间',
      description: '描述'
    },
    objectInfo: {
      unknownLocation: '未知位置'
    },
    cameraName: '监控点{num}号',
    defaultCameraName: '未命名监控点',
    locations: {
      cameras: {
        'mesh_0': '花园向南主通道',
        'mesh_1': '花园边通道',
        'mesh_2': '4号楼门洞',
        'mesh_3': '12号楼门洞',
        'mesh_4': '18号楼门洞',
        'mesh_5': '中心花园',
        'mesh_6': '13号楼门洞',
        'mesh_7': '19号楼停车场向西',
        'mesh_8': '健身场小路',
        'mesh_9': '3号楼门洞',
        'mesh_10': '大门口',
        'mesh_11': '8号楼边小路',
        'mesh_12': '高层中间通道',
        'mesh_13': '活动中心前通道',
        'mesh_14': '3号楼后小路',
        'mesh_15': '23号楼前通道',
        'mesh_16': '8号楼前通道',
        'mesh_17': '5号楼门前通道',
        'mesh_18': '19号楼门洞',
        'mesh_19': '居委物业边通道',
        'mesh_20': '垃圾房向南',
        'mesh_21': '12号楼向东',
        'mesh_22': '13号楼后小路',
        'mesh_23': '花园边向南主通道',
        'mesh_24': '20号边车棚',
        'mesh_25': '7号楼向东',
        'mesh_26': '消防门',
        'mesh_27': '16号楼后小路',
        'mesh_28': '20号楼门洞',
        'mesh_29': '1号楼前小路向西',
        'mesh_30': '2号楼边小路向北',
        'mesh_31': '23号楼边向北',
        'mesh_32': '7号楼边小路向南',
        'mesh_33': '主通道向北',
        'mesh_34': '地下车库出入口',
        'mesh_35': '11号楼边小路',
        'mesh_36': '2号楼向东'
      },
      buildings: {
        // 与当前的buildingLocationMap完全相同
        'mesh_0': '西部中央偏南，22号楼正南，面向小区内部南北向次干路',
        'mesh_1': '东北部，中央绿地东侧，与20号楼、支路相邻',
        'mesh_2': '中北部，中央绿地入口东侧，靠步行道',
        'mesh_3': '中北部，中央绿地西侧主入口旁的道路边',
        'mesh_4': '东南部偏北，13号楼上方，靠近河道边的次干路',
        'mesh_5': '在9号楼和3号楼之间',
        'mesh_6': '东南角，09号楼正南，面水岸一侧',
        'mesh_7': '东南部偏北，靠近9号楼',
        'mesh_8': '西南部偏北，21号楼下方，与17号楼、16号楼同一条竖向道路西侧',
        'mesh_9': '西南部偏西，12号楼下方，靠近小区西侧通道',
        'mesh_10': '西南部偏东，07号楼东侧，面向西侧主路',
        'mesh_11': '东北部偏南，19号楼正南，临东侧次干路',
        'mesh_12': '西南部偏中，17号楼下方，与11号楼并排',
        'mesh_13': '北侧偏东，24号楼东边，靠近北侧环路',
        'mesh_14': '中部偏东，16号楼与15号楼之间，靠近内部支路北侧',
        'mesh_15': '南部中央偏西，06号楼正南，与03号楼并列在南排建筑中',
        'mesh_16': '西北角，临逸仙路主入口附近，与24号楼相邻',
        'mesh_17': '西北部偏中，26号楼东侧，正对中央绿地北侧',
        'mesh_18': '西南部偏南，12号楼东侧，与9号楼、8号楼上下排列',
        'mesh_19': '西南角最南，08号楼正南，面向小区南侧小路',
        'mesh_20': '北侧最东端，23号楼正东，毗邻最外侧道路',
        'mesh_21': '西南角偏南，06号楼下方，与01号楼、西侧出口相邻',
        'mesh_22': '中偏北西，紧挨中央绿地西侧，22号楼上方是小垃圾站/停车标志所在道路',
        'mesh_23': '中心偏北，正南是小公园（中央绿地），面向南北向主路',
        'mesh_24': '中部偏东稍南，14号楼正南，13号楼西北侧',
        'mesh_25': '南部中央偏东，05号楼东侧，03号楼西侧',
        'mesh_26': '西南角最南，02号楼正东，面向小区南侧主入口',
        'mesh_27': '东南偏中，15号楼正南，面向社区东侧主路',
        'mesh_28': '西南部中段，18号楼东侧，12号楼西北方'
      }
    },
    names: {
      cameras: {
        'mesh_0': '00号摄像头',
        'mesh_1': '01号摄像头',
        'mesh_2': '02号摄像头',
        'mesh_3': '03号摄像头',
        'mesh_4': '04号摄像头',
        'mesh_5': '05号摄像头',
        'mesh_6': '06号摄像头',
        'mesh_7': '07号摄像头',
        'mesh_8': '08号摄像头',
        'mesh_9': '09号摄像头',
        'mesh_10': '10号摄像头',
        'mesh_11': '11号摄像头',
        'mesh_12': '12号摄像头',
        'mesh_13': '13号摄像头',
        'mesh_14': '14号摄像头',
        'mesh_15': '15号摄像头',
        'mesh_16': '17号摄像头',
        'mesh_17': '18号摄像头',
        'mesh_18': '19号摄像头',
        'mesh_19': '20号摄像头',
        'mesh_20': '21号摄像头',
        'mesh_21': '22号摄像头',
        'mesh_22': '23号摄像头',
        'mesh_23': '24号摄像头',
        'mesh_24': '25号摄像头',
        'mesh_25': '26号摄像头',
        'mesh_26': '27号摄像头',
        'mesh_27': '28号摄像头',
        'mesh_28': '29号摄像头',
        'mesh_29': '30号摄像头',
        'mesh_30': '31号摄像头',
        'mesh_31': '32号摄像头',
        'mesh_32': '33号摄像头',
        'mesh_33': '34号摄像头',
        'mesh_34': '35号摄像头',
        'mesh_35': '36号摄像头',
        'mesh_36': '37号摄像头'
      },
      buildings: {
        'mesh_0': '21号楼',
        'mesh_1': '19号楼',
        'mesh_2': '小垃圾站',
        'mesh_3': '大垃圾站',
        'mesh_4': '09号楼',
        'mesh_5': '停车空间',
        'mesh_6': '08号楼',
        'mesh_7': '10号楼',
        'mesh_8': '18号楼',
        'mesh_9': '07号楼',
        'mesh_10': '06号楼',
        'mesh_11': '20号楼',
        'mesh_12': '12号楼',
        'mesh_13': '23号楼',
        'mesh_14': '14号楼',
        'mesh_15': '05号楼',
        'mesh_16': '26号楼',
        'mesh_17': '24号楼',
        'mesh_18': '11号楼',
        'mesh_19': '03号楼',
        'mesh_20': '25号楼',
        'mesh_21': '02号楼',
        'mesh_22': '22号楼',
        'mesh_23': '16号楼',
        'mesh_24': '15号楼',
        'mesh_25': '04号楼',
        'mesh_26': '01号楼',
        'mesh_27': '13号楼',
        'mesh_28': '17号楼'
      }
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
