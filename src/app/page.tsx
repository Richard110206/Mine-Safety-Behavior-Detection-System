'use client';

import React from 'react';
import Navigation from '@/components/Navigation';
import MonitorPage from '@/pages/MonitorPage';
import AlertsPage from '@/pages/AlertsPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import AlertModal from '@/components/AlertModal';
import { useAppState } from '@/hooks/useAppState';

export default function Home() {
  const {
    currentPage,
    devices,
    alerts,
    sensorData,
    selectedDevice,
    selectedAlert,
    cameraStream,
    isModalOpen,
    analyticsData,
    handlePageChange,
    handleAlertStatusChange,
    handleDeviceSelect,
    handleAlertSelect,
    handleCameraToggle,
    closeModal
  } = useAppState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container-industrial py-6 min-h-screen flex flex-col">
        <Navigation
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

        {/* 页面内容区域 */}
        <main className="w-full flex-grow mt-8 mb-8">
          {currentPage === 'monitor' && (
            <MonitorPage
              devices={devices}
              sensorData={sensorData}
              selectedDevice={selectedDevice}
              cameraStream={cameraStream}
              onDeviceSelect={handleDeviceSelect}
              onCameraToggle={handleCameraToggle}
            />
          )}

          {currentPage === 'alerts' && (
            <AlertsPage
              alerts={alerts}
              onAlertStatusChange={handleAlertStatusChange}
              onAlertSelect={handleAlertSelect}
            />
          )}

          {currentPage === 'analytics' && (
            <AnalyticsPage
              analyticsData={analyticsData}
            />
          )}
        </main>

        {/* 告警详情弹窗 */}
        <AlertModal
          alert={selectedAlert}
          isOpen={isModalOpen}
          onClose={closeModal}
          onStatusChange={handleAlertStatusChange}
        />
      </div>
    </div>
  );
}
