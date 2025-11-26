'use client';

import { useState, useCallback } from 'react';
import { PageType, Device, Alert, AlertStatus } from '@/types';
import { mockDevices, mockAlerts, mockSensorData, mockAnalyticsData } from '@/data/mockData';

export function useAppState() {
  const [currentPage, setCurrentPage] = useState<PageType>('monitor');
  const [devices] = useState<Device[]>(mockDevices);
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [sensorData] = useState(mockSensorData);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(mockDevices[0]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageChange = useCallback((page: PageType) => {
    setCurrentPage(page);
  }, []);

  const handleAlertStatusChange = useCallback((alertId: string, newStatus: AlertStatus) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId ? { ...alert, status: newStatus } : alert
      )
    );
  }, []);

  const handleDeviceSelect = useCallback((device: Device) => {
    setSelectedDevice(device);
  }, []);

  const handleAlertSelect = useCallback((alert: Alert) => {
    setSelectedAlert(alert);
    setIsModalOpen(true);
  }, []);

  const handleCameraToggle = useCallback(async () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 }
        });
        setCameraStream(stream);
      } catch (error) {
        console.error('Failed to access camera:', error);
        alert('无法访问本地摄像头，请检查权限设置');
      }
    }
  }, [cameraStream]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedAlert(null);
  }, []);

  return {
    // State
    currentPage,
    devices,
    alerts,
    sensorData,
    selectedDevice,
    selectedAlert,
    cameraStream,
    isModalOpen,
    analyticsData: mockAnalyticsData,

    // Actions
    handlePageChange,
    handleAlertStatusChange,
    handleDeviceSelect,
    handleAlertSelect,
    handleCameraToggle,
    closeModal
  };
}