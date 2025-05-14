export default {
    title: 'Algorithm and Application Scenarios',
    yoloIntro: {
      title: 'YOLOv8 Algorithm Introduction',
      description1: 'YOLOv8 (You Only Look Once v8) is an advanced real-time object detection algorithm developed by Ultralytics, widely used in computer vision. The YOLO series is known for its efficiency and accuracy, capable of predicting multiple object classes and locations in a single network forward pass.',
      description2: 'This project utilizes YOLOv8 as the core algorithm to detect pedestrians and vehicles in community surveillance videos, enabling precise analysis of community spatiotemporal behavior. Compared to traditional methods, YOLOv8 offers the following advantages:',
      advantages: {
        accuracy: 'Better balance of detection accuracy and speed',
        network: 'Optimized network structure supporting real-time video analysis',
        features: 'Powerful feature extraction capability adaptable to complex environments',
        models: 'Rich pre-trained models supporting various object detection tasks'
      },
      imageAlt: 'YOLOv8 Architecture Diagram',
      imageCaption: 'YOLOv8 Model Architecture Diagram'
    },
    samplingMethods: {
      imagePath: 'System_architecture/data_accept_en.svg',
      title: 'Data Sampling Methods and Application Scenarios',
      intro: 'Based on different application requirements, this research designs four data sampling methods, each suitable for different application scenarios:',
      c1f1: {
        title: 'Single Camera Single Frame (c1f1)',
        tag: 'Real-time Monitoring',
        description: 'Single-frame image analysis from a single camera, mainly used for local high-response tasks requiring rapid reaction.',
        implementation: 'Technical Implementation',
        implementationDesc: 'Process single-frame images from camera video streams in real-time using YOLOv8 to identify specific targets and trigger corresponding responses.',
        applications: 'Application Scenarios',
        app1: 'Electric Vehicle Warning: Detect electric vehicles in non-motorized lanes and issue real-time warnings',
        app2: 'Fire Detection: Detect open flames in public areas for timely warnings',
        app3: 'Unauthorized Entry: Monitor personnel entry in specific areas',
        imageAlt: 'Single Camera Single Frame Example'
      },
      c1fn: {
        title: 'Single Camera Multiple Frames (c1fn)',
        tag: 'Trend Analysis',
        description: 'Analysis of continuous multiple frames or multiple time periods from a single camera, used to track activity trend changes in local areas.',
        implementation: 'Technical Implementation',
        implementationDesc: 'Perform object detection on video data from the same camera at different time points and conduct time series analysis on the results.',
        applications: 'Application Scenarios',
        app1: 'Pedestrian and Vehicle Flow Sampling: Statistics on changes in pedestrian and vehicle flow in specific areas over a period of time',
        app2: 'Activity Pattern Analysis: Explore temporal patterns of community activities, such as rush hour patterns',
        app3: 'Abnormal Behavior Detection: Identify abnormal activities that do not conform to regular patterns',
        imageAlt: 'Single Camera Multiple Frames Example'
      },
      cmf1: {
        title: 'Multiple Cameras Single Frame (cmf1)',
        tag: 'Spatial Modeling',
        description: 'Data analysis from multiple cameras at the same time point, used to construct a three-dimensional view of community spatial activities.',
        implementation: 'Technical Implementation',
        implementationDesc: 'Integrate detection results from multiple cameras at the same moment, utilizing spatial mapping technology to establish a three-dimensional scene model.',
        applications: 'Application Scenarios',
        app1: '3D Scene Modeling: Construct spatial distribution models of community activities',
        app2: 'Global Situation Awareness: Provide real-time conditions from a community-wide perspective',
        app3: 'Blind Spot Compensation: Reduce monitoring blind spots through multi-angle data fusion',
        imageAlt: 'Multiple Cameras Single Frame Example'
      },
      cmfn: {
        title: 'Multiple Cameras Multiple Frames (cmfn)',
        tag: 'Spatiotemporal Analysis',
        description: 'Comprehensive data analysis from multiple cameras at different time points, used for a complete understanding of community spatiotemporal activity patterns.',
        implementation: 'Technical Implementation',
        implementationDesc: 'Integrate long-term data from multiple cameras, combined with spatiotemporal data mining techniques, to construct a complete spatiotemporal model of community activities.',
        applications: 'Application Scenarios',
        app1: 'Global Data Analysis: Activity pattern and pattern mining at the community level',
        app2: 'Predictive Analysis: Predict future activity trends based on historical data',
        app3: 'Group Behavior Detection: Identify group activity patterns and abnormal gatherings in the community',
        imageAlt: 'Multiple Cameras Multiple Frames Example'
      }
    },
    workflow: {
      title: 'Technical Implementation Process',
      steps: {
        step1: {
          title: 'Data Collection',
          description: 'Obtain video stream data from community cameras'
        },
        step2: {
          title: 'Image Preprocessing',
          description: 'Image enhancement, cropping, and normalization'
        },
        step3: {
          title: 'YOLOv8 Detection',
          description: 'Detect pedestrians, vehicles, and abnormal situations'
        },
        step4: {
          title: 'Data Postprocessing',
          description: 'Trajectory tracking, data cleaning, and statistics'
        },
        step5: {
          title: 'Spatiotemporal Analysis',
          description: 'Construct spatiotemporal behavior models and predictions'
        }
      }
    },
    advantages: {
      title: 'Technical Advantages and Innovation',
      items: {
        accuracy: {
          title: 'High-Precision Recognition',
          description: 'Using the latest YOLOv8 algorithm, with pedestrian and vehicle recognition accuracy exceeding 95%, adaptable to various lighting and weather conditions'
        },
        realtime: {
          title: 'Real-Time Processing',
          description: 'Optimized inference engine supporting real-time video stream processing with latency below 100ms, meeting monitoring and early warning requirements'
        },
        multiDimension: {
          title: 'Multi-Dimensional Analysis',
          description: 'Integrated multi-modal data analysis across time and space dimensions, providing a comprehensive view of community activities'
        },
        visualization: {
          title: 'Visualization Display',
          description: 'Intuitive data visualization interface supporting multi-terminal access, facilitating understanding and use by management personnel'
        },
        privacy: {
          title: 'Privacy Protection',
          description: 'Built-in data desensitization processing ensures the protection of community residents\' privacy during data analysis'
        },
        extensibility: {
          title: 'System Extensibility',
          description: 'Modular design and open APIs facilitate integration with other smart community systems and functional expansion'
        }
      }
    },
    researchFramework: {
      title: 'Research Framework',
      multiSource: {
        title: 'Multi-source Data-driven Urban Renewal Intelligence Application Method',
        description: 'The multi-source data-driven urban renewal intelligence application method analyzes urban renewal tasks through data collection, data analysis, and data decision-making. At the data collection level, data from various elements is collected through different terminals and devices throughout the entire cycle. At the data analysis level, specific renovation design scenarios can be divided into personnel flow analysis, functional satisfaction analysis, and basic research situations, such as satisfaction surveys of existing functions and completeness surveys of infrastructure. In urban management scenarios, analysis can be conducted on spatial management conditions and whether urban spaces are congested. Based on the above analysis, accurate recommendations can be given at the design decision-making level, such as the location of renovation design, appropriate design methods, and specific functional choices for renovation spaces. In terms of dynamic management assessment, recommendations can be provided for parking management, pedestrian and vehicle flow control, and space management issues.'
      },
      videoData: {
        title: 'Video Data-driven Urban Renewal Intelligence Application Method',
        description1: 'The video data-driven urban renewal intelligence application method consists of video data collection, video data analysis, and video data decision-making. At the video data collection level, perception of existing spaces is achieved through the deployment of data collection points throughout urban spaces and their additions; data cleaning and preprocessing are performed through frontend network visual recognition and related data statistical algorithms. Generally, the recognition tasks of people, vehicles, and objects need to be processed in video data, as well as the movement relationships and position changes between various objects in the video. To obtain more comprehensive perceptual data, relevant video data is collected in real-time through 24/7 monitoring. In the data analysis section, through counting the pedestrian and vehicle flow in the area and tracking object trajectories, design evaluation index methods based on pedestrian and vehicle flow are proposed, and relevant indicator systems are constructed, such as space utilization rate and space vitality indicators within the community. These indicators are used to judge the functional use of spaces within the area. At the data decision-making level, it is divided into design decision recommendations and dynamic management assessment. According to specific scenarios of urban renewal design, specific recommendations for public space renovation and functional positions can be provided for old community renovation, offering suggestions for the location of additional infrastructure points and community courier points. For urban historical district renovation design and industrial heritage renovation design, specific reconstruction or preservation reference suggestions can be derived from semantic analysis of the corresponding scenario spaces. In terms of dynamic management assessment, specific management opinions can be derived based on urban space congestion, parking area management, and urban space management conditions, such as whether there are violations in the parking management of motor vehicles and non-motor vehicles, whether there is lane congestion in pedestrian and vehicle flow control management, and whether there are cases of road occupation in public spaces for early warning and handling.',
        description2: 'This method supports effective processing of large-scale urban video data, ensuring data quality and providing a reliable foundation for subsequent intelligent analysis.'
      },
      flowcharts: {
        videoTitle: 'Video Data-driven Urban Renewal Intelligence Application Method',
        videoDesc: 'Multi-dimensional urban renewal application framework based on video data',
        multiSourceTitle: 'Multi-source Data-driven Urban Renewal Intelligence Application',
        multiSourceDesc: 'Integrated multi-source data urban renewal decision support system'
      }
    },
    perceptionSystem: {
      summaryImagePath: 'System_architecture/summary_en.svg',
      title: 'Video Data-based Gaojing New Garden Community Renewal Intelligent Pedestrian and Vehicle Flow Perception System Application',
      overviewTitle: 'Application Overview',
      overview1: 'The video data-based Gaojing New Garden Community Renewal Intelligent Pedestrian and Vehicle Flow Perception System is a comprehensive intelligent monitoring platform that collects real-time dynamic information of pedestrian and vehicle flow within the community through existing high-definition camera networks deployed in the community, and processes it through AI algorithms for object detection, providing data support for community planning and renewal.',
      overview2: 'The system adopts a distributed architecture, combining edge computing with cloud servers to ensure the efficiency and accuracy of data processing. The raw video data collected by cameras is processed and identified by the YOLOv5 object detection algorithm to recognize pedestrians and vehicles in the scene, achieving complete recording and analysis of pedestrian and vehicle flow.',
      summaryImageAlt: 'Pedestrian and vehicle flow perception system interface',
      summaryImageCaption: 'Real-time interface of the pedestrian and vehicle flow monitoring system'
    },
    systemArchitecture: {
      architectureImagePath: 'System_architecture/architecture_en.png',
      title: 'System Architecture',
      architectureImageAlt: 'System architecture diagram',
      perception: {
        imagePath: 'System_architecture/sentor_layer_en.jpeg',
        title: 'Perception Layer',
        description: 'Cameras and video data collection',
        buttonShow: 'View Details',
        buttonHide: 'Hide Details',
        detailTitle: 'Detailed Structure of Perception Layer',
        imageAlt: 'Perception layer architecture diagram',
        detail1: 'The perception layer is the foundation component of the entire system, responsible for collecting real-time data of urban scenes through devices such as cameras. As the front-end entry point of the system, the perception layer constructs a comprehensive data collection network, ensuring that the system can obtain high-quality, full-coverage urban spatial information flow. During the implementation in Gaojing New Garden Community, we arranged strategic collection nodes, forming an efficient perception network.',
        detail2: 'This layer contains the following key components:',
        components: {
          data: 'Data Collection Devices: Including existing fixed or dome network cameras (supporting high-definition uploads and scheduled snapshots), and deploying devices in pairs or symmetrically at key locations such as corridors, unit entrances, and corners based on spatial orientation, field of view, and pedestrian and vehicle flow lines, to eliminate blind spots and achieve full coverage of the old community.',
          video: 'Video Stream Processing Unit: Processing raw video streams, conducting preprocessing and frame sampling, deploying recognition models on front-end cameras, improving data privacy and the efficiency of third-party data use.',
          server: 'Government Server: Real-time data transmission based on high-speed networks, supporting wired and wireless connections, constructing a low-latency, high-bandwidth transmission network to ensure data real-time performance.'
        },
        conclusion: 'The perception layer adopts a layered design, closely integrating data collection with preliminary processing, significantly reducing the amount of data transmission while increasing the system\'s anti-interference capability, laying a solid foundation for subsequent in-depth analysis.'
      },
      analysis: {
        imagePath: 'System_architecture/alayzise_layer_en.png',
        title: 'Analysis Layer',
        description: 'Video data analysis, pedestrian and vehicle flow statistics, parking/illegal pedestrian determination',
        buttonShow: 'View Details',
        buttonHide: 'Hide Details',
        detailTitle: 'Detailed Structure of Analysis Layer',
        imageAlt: 'Analysis layer architecture diagram',
        detail1: 'The analysis layer is the core intelligent unit of the system, responsible for in-depth processing and analysis of the raw data collected by the perception layer, extracting valuable information. This layer adopts a multi-level processing architecture, combining deep learning with traditional algorithms, achieving precise interpretation and understanding of complex scenes. In practical deployment, the analysis layer achieves both processing efficiency and real-time performance through a collaborative computing mode between the cloud and the edge.',
        detail2: 'The main functional modules of the analysis layer include:',
        components: {
          objectDetection: 'Object Detection and Tracking: Using the YOLOv5 algorithm to identify moving targets such as people and vehicles in videos, with a detection accuracy of over 94%.',
          behaviorAnalysis: 'Behavior Analysis Module: Analyzing target movement trajectories, determining whether abnormal behaviors exist, capable of identifying various behavior patterns such as loitering, gathering, and abnormal paths, providing a basis for space usage evaluation.',
          spaceAnalysis: 'Space Utilization Analysis: Counting pedestrian and vehicle flow, calculating space utilization rate, generating spatiotemporal heat maps, intuitively showing the activity level and usage patterns of different areas in the community.',
          parkingSystem: 'Parking Determination System: Based on threshold mask and area ratio calculation, determining whether vehicles are in a parking state, supporting the distinction between legal and illegal parking, providing data support for parking management.',
          visualization: 'Data Visualization Center: Intuitively presenting analysis results in the form of charts, heat maps, etc., providing multi-dimensional data display, supporting interactive queries in time and space dimensions.'
        },
        conclusion: 'The analysis layer adopts a modular design, where each functional unit can operate independently while working together to form a complete analysis chain. Through continuous algorithm optimization and model updates, the intelligence level of the analysis layer continues to improve, providing increasingly accurate data support for the decision-making layer.'
      },
      execution: {
        imagePath: 'System_architecture/action_en.png',
        title: 'Execution Layer',
        description: 'Daily management, facility renovation',
        buttonShow: 'View Details',
        buttonHide: 'Hide Details',
        detailTitle: 'Detailed Structure of Execution Layer',
        imageAlt: 'Execution layer architecture diagram',
        detail1: 'The execution layer is the decision output unit of the system, based on analysis results, formulating and implementing corresponding management strategies and renovation plans. This layer transforms data analysis into practical actions, enhancing community management efficiency and spatial quality through intelligent recommendations and human-machine collaboration.',
        detail2: 'The main functional modules of the execution layer include:',
        components: {
          dailyManagement: {
            title: 'Daily Management Module:',
            parking: 'Parking Management: Automatically pushing reminders or notifying management personnel based on vehicle illegal parking situations, supporting historical record queries and statistical analysis, forming closed-loop management.',
            flow: 'Pedestrian Flow Control: When pedestrian density exceeds the safety threshold, triggering an early warning mechanism, providing diversion suggestions, preventing congestion risks, and ensuring the safety of community public spaces.',
            green: 'Green Space Management: Detecting illegal occupation of green spaces, safeguarding the ecological nature of green spaces, recording and managing unreasonable occupations, maintaining the environmental order of the community.'
          },
          renovation: {
            title: 'Facility Renovation Module:',
            space: 'Public Space Optimization: Based on space usage data, proposing renovation plans and location suggestions, providing differentiated design strategies for areas with different pedestrian and vehicle flow characteristics.',
            infrastructure: 'Infrastructure Planning: Determining the optimal locations for new facilities, such as courier stations, rest areas, etc., maximizing facility service efficiency and coverage.',
            decision: 'Decision Support System: Integrating various analysis results, providing comprehensive decision-making basis for managers, including data reports, trend predictions, and scheme comparisons, supporting scientific decision-making.'
          }
        },
        conclusion: 'The execution layer adopts a "recommendation + intervention" work mode, capable of providing intelligent decision-making suggestions while retaining the possibility of human intervention, achieving human-machine collaborative management. Through continuous interaction with community residents and feedback collection, the decision-making quality of the execution layer continues to improve, forming a self-optimizing virtuous cycle.'
      }
    },
    techDetails: {
      title: 'Technical Details',
      tabs: {
        detection: 'Detection & Tracking',
        parking: 'Parking Determination',
        greenspace: 'Green Space Intrusion Detection',
        digital: 'Digital Twin'
      },
      detectionTracking: {
        imagePath: 'technology/YOLOv5_dectection.jpeg',
        title: 'YOLOv5 Object Detection and Data Perception System',
        paragraph1: 'This project uses the YOLOv5 algorithm for object detection and combines 24/7 video data collection to achieve continuous tracking and optimization of multiple scenarios, building an all-weather efficient and precise video analysis system. Compared to traditional methods, this system has achieved significant improvements in performance and accuracy, providing reliable technical support for community pedestrian and vehicle flow monitoring.',
        paragraph2: 'The main features of the system include:',
        features: {
          realtime: 'Real-time Processing: Can process 25+ frames per second, meeting real-time monitoring requirements, and maintaining good performance even on edge computing devices.',
          accuracy: 'High-precision Detection: Pedestrian and vehicle detection accuracy >94%, maintaining stable performance under complex background and lighting conditions.'
        },
        paragraph3: 'In the actual project deployment, we optimized the model according to the characteristics of the community environment, improving the recognition capability for small targets and partially occluded targets, recording the pedestrian and vehicle count statistics at each camera node, providing reliable data support for urban renewal decision-making.',
        imageAlt: 'YOLOv5 detection effect diagram',
        imageCaption: 'YOLOv5 Detection Effect'
      },
      parkingDetection: {
        imagePath: 'technology/parking_detection_en.png',
        title: 'Threshold Mask-based Parking State Determination',
        paragraph1: 'This project developed a threshold mask-based parking state determination algorithm for accurately identifying vehicle parking states in the community. This algorithm combines spatial position and time continuity dual constraints, effectively solving the problem of high false judgment rates in traditional methods in complex scenes. The algorithm achieves precise determination of parking states through the following steps:',
        steps: {
          step1: {
            title: '1. Define Parking Area Mask',
            content: 'Pre-define a mask image Mask in the system representing the allowable parking area range. This step is completed through a combination of manual annotation and automatic generation, ensuring the accuracy and completeness of the mask. For different functional areas within the community, we set differentiated parking rules, distinguished through mask attributes, improving the adaptability of the determination.'
          },
          step2: {
            title: '2. Detect Vehicle Position',
            content: 'Detect the vehicle position P(x,y) in each frame of video in real-time, obtaining the coordinates of the vehicle\'s bounding box. This step uses YOLOv5 for efficient object detection, and the system can adapt to different lighting conditions and partial occlusions, ensuring the reliability of detection.'
          },
          step3: {
            title: '3. Calculate Overlap',
            content: 'Calculate the overlap between the vehicle\'s bounding box and the parking area mask α = Area(P ∩ Mask) / Area(P), which is the intersection area between the vehicle and the parking area divided by the total area of the vehicle. This indicator reflects the proportion of the vehicle in the parking area and is a key parameter for determining the parking state. The algorithm uses efficient pixel calculation methods to ensure real-time performance.'
          },
          step4: {
            title: '4. Determine Parking State',
            content: 'When α > threshold T and the duration > time threshold τ, determine as a parking state. This ensures that the vehicle is indeed in the parking area and has stayed for a sufficient length of time. The double threshold mechanism effectively filters temporary stops and passing vehicles, improving the accuracy of determination. Through experimental verification, the optimal threshold T is set to 0.75, and the time threshold τ is 15 seconds, achieving good results in practical applications.',
            formula: 'Parking State = { True, if α > T and t > τ\nFalse, otherwise'
          }
        },
        imageAlt: 'Parking determination algorithm diagram',
        imageCaption: 'Parking Determination Algorithm Diagram'
      },
      greenspace: {
        imagePath: 'technology/illegal-pedestrian-detection_en.png',
        title: 'Green Space Illegal Pedestrian Detection',
        paragraph1: 'This project developed a green space illegal pedestrian intrusion detection algorithm, precisely identifying illegal intrusion behaviors in green areas within the community through video surveillance and AI technology, enhancing green space protection effects and community environmental quality. The system adopts a method combining area restriction and behavior analysis, ensuring the protection of the environment while not affecting normal resident activities.',
        paragraph2: 'The system\'s working principle is as follows:',
        steps: {
          step1: {
            title: '1. Green Area Definition',
            content: 'Precisely delineate the green protection areas within the community through field research, creating mask image Mask.'
          },
          step2: {
            title: '2. Real-time Pedestrian Detection',
            content: 'The system uses an improved YOLOv5 model to detect pedestrians in monitoring images in real-time, obtaining pedestrian foot position P(x,y), detecting whether a person\'s feet are within the green area.'
          },
          step3: {
            title: '3. Behavior Analysis and Determination',
            content: 'The system not only detects pedestrian position (foot position) but also analyzes their behavior patterns. By calculating the overlap between pedestrians and green areas β = Area(P ∩ GreenMask) / Area(P) and their stay time t, combined with behavioral features (such as sitting, lying, picking, etc.), a comprehensive judgment is made on whether it constitutes illegal intrusion.',
            formula: 'Intrusion Level = f(β, t, behavior type, number of people)\nwhere β is the area overlap, t is the stay time'
          },
          step4: {
            title: '4. Response and Recording Mechanism',
            content: 'After detecting intrusion behavior, the system records the event, displays it on the management interface, sends real-time alerts to management personnel, and records complete video evidence. All events are entered into the database, forming a heat map, helping management personnel identify frequent areas for targeted protective measures enhancement.'
          }
        },
        imageAlt: 'Green space intrusion detection diagram',
        imageCaption: 'Green Space Illegal Intrusion Detection Example'
      },
      digital: {
        imagePath: 'technology/data_twins.png',
        title: 'Digital Twin Visualization Technology',
        paragraph1: 'This project constructed a high-precision community digital twin system, achieving accurate mapping between the virtual and reality. The system intuitively presents complex data analysis results through three-dimensional visualization technology, providing intuitive and comprehensive visualization support for urban renewal decision-making. The digital twin system adopts multi-source data fusion technology, ensuring high consistency between the virtual model and the real environment.',
        paragraph2: 'The system is constructed using the following technologies:',
        features: {
          photogrammetry: 'Oblique Photography: Capturing real texture data of the community through multi-angle drone photography, capturing details of the physical environment such as buildings, roads, and vegetation, ensuring the realism of the digital model.',
          rendering: 'Real-time Rendering: Implementing high-performance Web-end 3D model rendering based on Three.js, supporting smooth operation in ordinary browsers.',
          fusion: 'Data Fusion: Mapping real-time detection and analysis data into the 3D scene, including pedestrian and vehicle flow heat maps, space utilization analysis, and abnormal event markers, achieving spatial display of data.',
          interaction: 'Interactive Functions: Supporting interactive operations such as rotation, scaling, panning, and point selection, allowing users to freely explore community spaces and query data indicators and renovation suggestions for specific areas.'
        },
        imageAlt: 'Digital twin model',
        imageCaption: 'Community Digital Twin Visualization Effect'
      }
    },
    exploration: {
      title: 'Project In-depth Exploration',
      description: 'Through the following links, you can learn more details about this project. View the project\'s three-dimensional model visualization and detailed data analysis to get more comprehensive community transformation information.',
      model3d: {
        title: '3D Model Scene',
        description: 'Learn more project details'
      },
      dataViz: {
        title: 'Data Visualization',
        description: 'Learn about project data content'
      }
    },
    flowcharts: {
      videoData: {
        title: "Video Data-driven Urban Renewal Intelligence Application Method",
        dataCollection: "Video Data Collection",
        dataAnalysis: "Video Data Analysis",
        dataDecision: "Video Data Decision",
        dataCollectionSub: "Video Data Collection",
        realTimeData: "24/7 Real-time Data Collection",
        fullAreaData: "Full-area Data Collection Points",
        frontendRecognition: "Frontend Visual Recognition",
        dataPreprocessing: "Data Cleaning and Preprocessing",
        dataAnalysisSub: "Video Data Analysis",
        trafficFlow: "Regional Pedestrian and Vehicle Flow",
        spaceUsage: "Actual Space Usage Rate and Function",
        semanticAnalysis: "Historic District and Scene Space Semantic Analysis",
        designDecision: "Design Decision Suggestions",
        dynamicManagement: "Dynamic Management Assessment",
        designDecisionSub: "Design Decision Suggestions",
        communityRenovation: "Old Community Renovation",
        historicRenovation: "Historic District Building Renovation",
        industrialRenovation: "Industrial Heritage Renovation",
        publicSpaceRenovation: "Public Space Renovation Function and Location",
        infrastructureAdd: "Infrastructure Addition Points",
        deliveryStation: "Community Delivery Station Location",
        historicEvaluation: "Historic Building Space Assessment",
        industrialEvaluation: "Industrial Heritage Space Assessment",
        dynamicManagementSub: "Dynamic Management Assessment",
        parkingManagement: "Parking Area Management",
        trafficControl: "Pedestrian and Vehicle Flow Control",
        congestionStatus: "Urban Space Congestion Status",
        publicSpaceOccupation: "Public Space Occupation",
        nonMotorManagement: "Non-motor Vehicle Management"
      },
      multiSource: {
        title: "Multi-source Data-driven Urban Renewal Intelligence Application",
        dataCollection: "Data Collection",
        dataAnalysis: "Data Analysis",
        dataDecision: "Data Decision",
        fixedDevicesSub: "Fixed Device Data Collection",
        fixedDevices: "Fixed Device Data Collection",
        cameraData: "Camera Data",
        accessData: "Access Control Data",
        electricityData: "Electric Meter Data",
        poiData: "POI Data",
        mobileDevicesSub: "Mobile Device Data Collection",
        mobileDevices: "Mobile Device Data Collection",
        lbsData: "LBS Data",
        internetData: "Internet Seasonal Data",
        gpsData: "GPS Data",
        dataCollectionSub: "Data Collection",
        designScenariosSub: "Specific Renovation Design Scenarios",
        designScenarios: "Specific Renovation Design Scenarios",
        personnelFlow: "Personnel Flow Analysis",
        functionSatisfaction: "Function Satisfaction Analysis",
        basicSurvey: "Basic Survey Situation",
        managementScenariosSub: "Specific Urban Management Scenarios",
        managementScenarios: "Specific Urban Management Scenarios",
        spaceManagement: "Space Management Situation",
        spaceCongestion: "Urban Space Congestion",
        dataAnalysisSub: "Data Analysis",
        designDecisionSub: "Design Decision Suggestions",
        designDecision: "Design Decision Suggestions",
        designLocation: "Renovation Design Locations",
        designMethod: "Renovation Design Methods",
        spaceFunction: "Renovation Space Function Selection",
        dynamicManagementSub: "Dynamic Management Assessment",
        dynamicManagement: "Dynamic Management Assessment",
        parkingManagementIssue: "Parking Management Issues",
        trafficControlIssue: "Traffic Control Issues",
        spaceManagementIssue: "Space Management Issues",
        dataDecisionSub: "Data Decision"
      }
    }
}
