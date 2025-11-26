export type PageType = 'monitor' | 'alerts' | 'analytics';

export type DeviceStatus = 'online' | 'offline' | 'warning';

export type AlertType = 'helmet' | 'track' | 'gas';

export type AlertStatus = 'pending' | 'processing' | 'resolved';

export type Priority = 'high' | 'medium' | 'low';

export interface Device {
  id: string;
  name: string;
  location: string;
  status: DeviceStatus;
  lastSeen: Date;
  cameraActive: boolean;
}

export interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  threshold: number;
  status: 'normal' | 'warning' | 'danger';
}

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  location: string;
  timestamp: Date;
  priority: Priority;
  status: AlertStatus;
  description: string;
  deviceId?: string;
  snapshot?: string;
  sensorData?: SensorData[];
}

export interface AnalyticsData {
  totalAlerts: number;
  resolvedAlerts: number;
  pendingAlerts: number;
  devicesOnline: number;
  devicesOffline: number;
  weeklyTrend: Array<{ day: string; alerts: number }>;
  alertDistribution: Array<{ type: string; count: number }>;
  sensorMetrics: Array<{
    name: string;
    current: number;
    average: number;
    max: number;
    unit: string;
  }>;
}