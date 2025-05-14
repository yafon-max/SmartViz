export default {
  title: 'Community Data Analysis and Visualization',
  overview: {
    pedestrianTotal: 'Total Pedestrians',
    vehicleTotal: 'Total Vehicles',
    peakHours: 'Peak Hours',
    abnormalEvents: 'Abnormal Events',
    weekCompare: 'vs Last Week',
    workday: 'Workday',
    weekend: 'Weekend'
  },
  filters: {
    dayType: 'Day Type',
    all: 'All',
    workday: 'Workday',
    weekend: 'Weekend',
    viewData: 'View Data'
  },
  charts: {
    pedestrianDistribution: 'Pedestrian Flow Distribution',
    vehicleDistribution: 'Vehicle Flow Distribution',
    communityHeatmap: 'Community Activity Heatmap',
    pedestrian: 'Pedestrian',
    vehicle: 'Vehicle',
    timeUnit: 'Time (Hours)',
    personCount: 'Person Count',
    vehicleCount: 'Vehicle Count',
    coordinate: 'Coordinate',
    value: 'Value'
  },
  camera: {
    title: 'Camera Monitoring',
    prev: 'Previous',
    next: 'Next',
    time: 'Time',
    location: 'Location',
    detections: 'Detections',
    noImages: 'No Images Available',
    workday: 'Workday',
    weekend: 'Weekend'
  },
  spaceDiagnosis: {
    title: 'Community Public Space Diagnosis and Redesign',
    classification: 'Public Space Classification by Traffic Patterns',
    strategy: 'Redesign Strategies',
    masterplan: 'Redesign Master Plan',
    representative: 'Representative Cameras',
    illegalPedestrians: 'Illegal Pedestrian Activities',
    parking: 'Parking Detection',
    dailyData: 'Daily Data Summary',
    targetAreas: 'Target Areas',
    redesignRenderings: 'Redesign Renderings',
    analysisMap: 'Spatial Analysis Map',
    designMap: 'Redesign Master Plan',
    masterplanTitle: 'Community Renovation Master Plan',
    masterplanDescription: 'Based on monitoring and analyzing pedestrian and vehicle flow in different areas of the community, we have conducted a comprehensive spatial diagnosis of Gaojing New Garden Community, identifying areas with different characteristics and proposing targeted renovation schemes. This master plan shows the overall planning of diagnosis and renovation, from spatial usage characteristics to specific design strategies, forming a complete community public space renovation system.',
    analysisMapAlt: 'Community Spatial Analysis Map',
    analysisDescription: 'The analysis of pedestrian and vehicle flow in different functional areas of the community and the diagnosis of spatial characteristics are the core analytical work of this project. Through Yolov5 model detection and data collection and analysis technology, we have monitored the Gaojing New Garden Community around the clock. According to the different distribution characteristics of pedestrian and vehicle flow, the public spaces in the community are divided into four scenarios, which are exemplified on the master plan.',
    designMapAlt: 'Community Renovation Design Master Plan',
    designDescriptionPart1: 'The comprehensive renovation design scheme for community public spaces based on pedestrian and vehicle flow analysis is the key link to transform data analysis into practical design strategies. Our design team has developed comprehensive and systematic spatial optimization strategies based on preliminary data analysis results.',
    designDescriptionPart2: 'The scheme fully considers the usage characteristics and functional requirements of different areas, and proposes four types of optimization strategies: for areas with few pedestrians and many vehicles, mainly using standardized design of parking spaces; for low-utilization areas, focusing on landscape enhancement and ecological function strengthening; for high pedestrian flow areas, creating diversified activity spaces; and for time-shifted peak areas, designing flexible and variable functional components.'
  },
  scenarios: {
    imageCaption: {
      pedestrianDetection: 'Pedestrian Detection and Statistics',
      parkingDetection: 'Parking Detection',
      noParkingDetection: 'No Relevant Vehicles',
      dailyData: '24-hour Vehicle and Pedestrian Flow Statistics (The CameraID in the legend has a one-unit offset from the ID sequence in the 3D scene, so the CameraID shown here is 08, actually Camera-07)',
      peakTimeData: 'Time-shifted Distribution of Pedestrian and Vehicle Flow (The CameraID in the legend has a one-unit offset from the ID sequence in the 3D scene, so the CameraID shown here is 08, actually Camera-07)'
    },
    highVehicleLowPedestrian: {
      name: 'Low Pedestrian, High Vehicle Area',
      description: 'This area is typically an internal road or parking area in the community. Pedestrian activity is limited, but vehicle flow and parking demand are high, resulting in space primarily occupied by motor vehicles. Below are representative cameras, with images from Camera-07.',
      strategy: {
        title: 'Design as Space-Adaptable Parking Areas',
        description: 'According to pedestrian and vehicle flow data analysis, this scenario is suitable for optimization into standardized parking areas. The design scheme maximizes the use of limited space through reasonable planning of parking space dimensions; establishes clear separation between vehicle and pedestrian areas to ensure pedestrian safety; and adds green isolation belts to improve the visual experience of the parking environment. The renovation images are from the design for Camera-07.',
        image1: 'Parking Space Optimization Design',
        image2: 'Renovated Parking Area Preview'
      }
    },
    lowVehicleLowPedestrian: {
      name: 'Low Pedestrian, Low Vehicle Area',
      description: 'These areas are typically located at the edge of the community or in transitional spaces with weaker functionality, where both pedestrian and vehicle activities are minimal, spatial utilization is low, and there is significant potential for renovation. Below are representative cameras, with images from Camera-29.',
      strategy: {
        title: 'Add Landscape Features, Enhance Green Coverage',
        description: 'For spaces with both low pedestrian and vehicle flow, the renovation strategy focuses on improving environmental quality and ecological value. The design introduces vertical greening structures, increases plant coverage; arranges landscape features to enhance spatial aesthetics; and adopts a growable design concept, leaving room for future spatial function evolution. The renovation images are from the design for Camera-29.',
        image1: 'Landscape Feature Design',
        image2: 'Renovated Green Space Effect'
      }
    },
    highPedestrianLowVehicle: {
      name: 'High Pedestrian, Low Vehicle Area',
      description: 'These are mainly activity center areas within the community, with high resident concentration and large pedestrian flow, but few vehicles passing through or parking, suitable for developing people-oriented activity spaces. Below are representative cameras, with images from Camera-08.',
      strategy: {
        title: 'Design More Leisure Spaces, Such as Fitness Areas, Cultural Corridors, and Children\'s Activities',
        description: 'For spaces with high pedestrian flow but few vehicles, the renovation focus is on creating diverse people-oriented activity venues. The design includes fitness facility areas for different age groups; landscape corridors incorporating community cultural elements; safe activity spaces suitable for children\'s games; and flexible community gathering places to meet the needs of different resident groups. The renovation images are from the designs for Camera-08, Camera-14, and Camera-22.',
        image1: 'Community Fitness Activity Shared Space Design Scheme',
        image2: 'Community Fitness Activity Space Rendering',
        image3: 'Community Children\'s Activity Space Rendering',
        image4: 'Community Cultural Corridor Aerial View Rendering',
        image5: 'Community Cultural Corridor Space Rendering'
      }
    },
    alternatePeaks: {
      name: 'Alternating Peak Times',
      description: 'These areas exhibit temporal distribution characteristics, showing pedestrian flow peaks or vehicle flow peaks at different times of the day, with space usage showing obvious time differences. Below are representative cameras, with images from Camera-33.',
      strategy: {
        title: 'Design Structures for Human Rest After Vehicles Leave, Providing Activity Tables, Chairs, and Facilities',
        description: 'In response to the characteristics of time-shifted usage between pedestrians and vehicles, the design adopts a temporally elastic strategy. The renovation scheme includes foldable or movable activity facilities that can quickly expand after vehicles leave; modular leisure table and chair systems that can be flexibly combined according to usage needs; and intelligent lighting systems that automatically adjust brightness and range according to activity periods, maximizing the temporal efficiency of space utilization. The renovation images are from the design for Camera-33.',
        image1: 'Time-shifted Usage Activity Space Design Scheme',
        image2: 'Variable Structure and Flexible Seating Configuration Effect'
      }
    }
  }
}
