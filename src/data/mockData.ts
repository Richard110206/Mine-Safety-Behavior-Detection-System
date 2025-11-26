import { Device, Alert, SensorData, AnalyticsData, AlertType, AlertStatus, Priority, DeviceStatus } from '@/types';

export const mockDevices: Device[] = [
  {
    id: 'CAM-001',
    name: '主井口摄像头',
    location: '主井口区域',
    status: 'online',
    lastSeen: new Date(Date.now() - 1000 * 60 * 2),
    cameraActive: true
  },
  {
    id: 'CAM-002',
    name: '掘进工作面摄像头',
    location: '掘进工作面',
    status: 'online',
    lastSeen: new Date(Date.now() - 1000 * 60 * 1),
    cameraActive: true
  },
  {
    id: 'CAM-003',
    name: '运输巷道摄像头',
    location: '运输巷道',
    status: 'warning',
    lastSeen: new Date(Date.now() - 1000 * 60 * 15),
    cameraActive: false
  },
  {
    id: 'CAM-004',
    name: '通风机房摄像头',
    location: '通风机房',
    status: 'online',
    lastSeen: new Date(Date.now() - 1000 * 60 * 5),
    cameraActive: true
  },
  {
    id: 'CAM-005',
    name: '变电所摄像头',
    location: '变电所',
    status: 'offline',
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2),
    cameraActive: false
  },
  {
    id: 'CAM-006',
    name: '采煤工作面摄像头',
    location: '采煤工作面',
    status: 'online',
    lastSeen: new Date(Date.now() - 1000 * 60 * 3),
    cameraActive: true
  }
];

export const mockSensorData: SensorData[] = [
  {
    id: 'GAS-001',
    name: '瓦斯浓度',
    value: 0.8,
    unit: '%',
    threshold: 1.0,
    status: 'normal'
  },
  {
    id: 'DUST-001',
    name: '粉尘浓度',
    value: 8.5,
    unit: 'mg/m³',
    threshold: 10.0,
    status: 'warning'
  },
  {
    id: 'TEMP-001',
    name: '环境温度',
    value: 28.5,
    unit: '°C',
    threshold: 35.0,
    status: 'normal'
  },
  {
    id: 'HUMI-001',
    name: '环境湿度',
    value: 75,
    unit: '%',
    threshold: 80,
    status: 'normal'
  },
  {
    id: 'OXY-001',
    name: '氧气浓度',
    value: 19.5,
    unit: '%',
    threshold: 19.0,
    status: 'normal'
  },
  {
    id: 'WIND-001',
    name: '风速',
    value: 2.2,
    unit: 'm/s',
    threshold: 0.5,
    status: 'normal'
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    type: 'helmet',
    title: '未佩戴安全帽',
    location: '主井口区域',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    priority: 'high',
    status: 'pending',
    description: '检测到工作人员进入主井口区域时未佩戴安全帽',
    deviceId: 'CAM-001'
  },
  {
    id: 'ALT-002',
    type: 'track',
    title: '跨越运输轨道',
    location: '运输巷道',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    priority: 'high',
    status: 'processing',
    description: '检测到人员在运输巷道违规跨越运输轨道',
    deviceId: 'CAM-003'
  },
  {
    id: 'ALT-003',
    type: 'gas',
    title: '瓦斯浓度超标',
    location: '掘进工作面',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    priority: 'high',
    status: 'resolved',
    description: '掘进工作面瓦斯浓度超过安全阈值，已启动通风系统',
    deviceId: 'CAM-002'
  },
  {
    id: 'ALT-004',
    type: 'helmet',
    title: '未佩戴安全帽',
    location: '采煤工作面',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    priority: 'medium',
    status: 'pending',
    description: '采煤工作面工作人员未按规定佩戴安全帽',
    deviceId: 'CAM-006'
  },
  {
    id: 'ALT-005',
    type: 'track',
    title: '接近危险区域',
    location: '变电所',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    priority: 'medium',
    status: 'resolved',
    description: '未授权人员接近变电所危险区域',
    deviceId: 'CAM-005'
  },
  {
    id: 'ALT-006',
    type: 'gas',
    title: '粉尘浓度偏高',
    location: '运输巷道',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    priority: 'low',
    status: 'processing',
    description: '运输巷道粉尘浓度接近警戒值，建议增加喷雾降尘',
    deviceId: 'CAM-003'
  }
];

export const mockAnalyticsData: AnalyticsData = {
  totalAlerts: 156,
  resolvedAlerts: 98,
  pendingAlerts: 12,
  devicesOnline: 4,
  devicesOffline: 1,
  weeklyTrend: [
    { day: '周一', alerts: 24 },
    { day: '周二', alerts: 18 },
    { day: '周三', alerts: 31 },
    { day: '周四', alerts: 15 },
    { day: '周五', alerts: 28 },
    { day: '周六', alerts: 22 },
    { day: '周日', alerts: 18 }
  ],
  alertDistribution: [
    { type: '未戴安全帽', count: 68 },
    { type: '跨越轨道', count: 45 },
    { type: '气体超标', count: 43 }
  ],
  sensorMetrics: [
    {
      name: '瓦斯浓度',
      current: 0.8,
      average: 0.6,
      max: 1.2,
      unit: '%'
    },
    {
      name: '粉尘浓度',
      current: 8.5,
      average: 6.2,
      max: 12.8,
      unit: 'mg/m³'
    },
    {
      name: '环境温度',
      current: 28.5,
      average: 26.8,
      max: 32.1,
      unit: '°C'
    },
    {
      name: '氧气浓度',
      current: 19.5,
      average: 20.1,
      max: 21.0,
      unit: '%'
    }
  ]
};