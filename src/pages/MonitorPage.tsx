'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Device, SensorData } from '@/types';
import { Camera, CameraOff, Wifi, WifiOff, AlertTriangle, Gauge, Thermometer, Wind, Droplets } from 'lucide-react';

interface MonitorPageProps {
  devices: Device[];
  sensorData: SensorData[];
  selectedDevice: Device | null;
  cameraStream: MediaStream | null;
  onDeviceSelect: (device: Device) => void;
  onCameraToggle: () => void;
}

const MonitorPage: React.FC<MonitorPageProps> = ({
  devices,
  sensorData,
  selectedDevice,
  cameraStream,
  onDeviceSelect,
  onCameraToggle
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  const handleScreenshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        setScreenshotUrl(canvas.toDataURL('image/png'));
      }
    }
  };

  const getSensorIcon = (name: string) => {
    switch (name) {
      case '瓦斯浓度':
        return AlertTriangle;
      case '粉尘浓度':
        return Gauge;
      case '环境温度':
        return Thermometer;
      case '环境湿度':
        return Droplets;
      case '风速':
        return Wind;
      default:
        return Gauge;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-500';
      case 'warning':
        return 'text-orange-500';
      case 'danger':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-12 page-transition">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* 设备列表 */}
        <div className="lg:col-span-1">
          <div className="industrial-card py-10 px-8">
            <h2 className="text-xl font-semibold text-orange-500 mb-8 flex items-center">
              <Camera className="w-6 h-6 mr-3" />
              监控设备
            </h2>
            <div className="space-y-6">
              {devices && devices.map(device => (
                <button
                  key={device.id}
                  onClick={() => onDeviceSelect(device)}
                  className={`
                    w-full p-4 rounded-lg border transition-all duration-200 text-left
                    ${selectedDevice?.id === device.id
                      ? 'bg-orange-600 border-orange-500 text-white'
                      : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-base">{device.name}</span>
                    {device.status === 'online' ? (
                      <Wifi className="w-5 h-5 text-green-500" />
                    ) : device.status === 'warning' ? (
                      <Wifi className="w-5 h-5 text-orange-500" />
                    ) : (
                      <WifiOff className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div className="text-sm opacity-75">{device.location}</div>
                  <div className="text-sm mt-2">
                    最后在线: {device.lastSeen.toLocaleTimeString()}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 视频监控区域 */}
        <div className="lg:col-span-2">
          <div className="industrial-card py-10 px-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-orange-500 flex items-center">
                <Camera className="w-6 h-6 mr-3" />
                {selectedDevice ? selectedDevice.name : '选择监控设备'}
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={onCameraToggle}
                  className={`
                    industrial-button px-5 py-3 text-base flex items-center gap-3
                    ${cameraStream ? 'danger' : 'success'}
                  `}
                >
                  {cameraStream ? (
                    <>
                      <CameraOff className="w-5 h-5" />
                      关闭摄像头
                    </>
                  ) : (
                    <>
                      <Camera className="w-5 h-5" />
                      开启摄像头
                    </>
                  )}
                </button>
                {cameraStream && (
                  <button
                    onClick={handleScreenshot}
                    className="industrial-button px-5 py-3 text-base"
                  >
                    截图
                  </button>
                )}
              </div>
            </div>

            <div className="relative aspect-video bg-black rounded-lg overflow-hidden border-4 border-gray-700">
              {cameraStream ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                  <Camera className="w-20 h-20 mb-6" />
                  <p className="text-xl">点击开启本地摄像头</p>
                  <p className="text-base mt-3">Camera not activated</p>
                </div>
              )}
            </div>

            {selectedDevice && (
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between text-base">
                  <span className="text-gray-400">设备ID: {selectedDevice.id}</span>
                  <span className="flex items-center gap-3">
                    状态:
                    <span className={`
                      px-3 py-2 rounded text-sm font-medium
                      ${selectedDevice.status === 'online' ? 'bg-green-600 text-white' :
                        selectedDevice.status === 'warning' ? 'bg-orange-600 text-white' :
                        'bg-red-600 text-white'}
                    `}>
                      {selectedDevice.status === 'online' ? '在线' :
                       selectedDevice.status === 'warning' ? '警告' : '离线'}
                    </span>
                  </span>
                </div>
              </div>
            )}

            {screenshotUrl && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">最新截图:</h3>
                <img
                  src={screenshotUrl}
                  alt="Screenshot"
                  className="w-full rounded-lg border border-gray-700"
                />
              </div>
            )}
          </div>
        </div>

        {/* 传感器数据 */}
        <div className="lg:col-span-1">
          <div className="industrial-card py-10 px-8">
            <h2 className="text-xl font-semibold text-orange-500 mb-8 flex items-center">
              <Gauge className="w-6 h-6 mr-3" />
              环境监测
            </h2>
            <div className="space-y-5">
              {sensorData && sensorData.map(sensor => {
                const Icon = getSensorIcon(sensor.name);
                const isWarning = sensor.value >= sensor.threshold * 0.8;
                const isDanger = sensor.value >= sensor.threshold;

                return (
                  <div
                    key={sensor.id}
                    className={`
                      p-4 rounded-lg border
                      ${isDanger ? 'bg-red-900 border-red-700' :
                        isWarning ? 'bg-orange-900 border-orange-700' :
                        'bg-gray-800 border-gray-700'}
                    `}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${getStatusColor(sensor.status)}`} />
                        <span className="text-base font-medium">{sensor.name}</span>
                      </div>
                      {(isWarning || isDanger) && (
                        <AlertTriangle className="w-5 h-5 text-red-500 alert-blink" />
                      )}
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      {sensor.value.toFixed(1)}
                      <span className="text-base text-gray-400 ml-2">{sensor.unit}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      阈值: {sensor.threshold} {sensor.unit}
                    </div>
                    {isDanger && (
                      <div className="text-sm text-red-400 mt-2 font-medium">
                        ⚠️ 超过安全阈值
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 状态统计 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="industrial-card p-8 text-center">
          <div className="text-3xl font-bold text-green-500">
            {devices && devices.filter(d => d.status === 'online').length}
          </div>
          <div className="text-base text-gray-400 mt-2">设备在线</div>
        </div>
        <div className="industrial-card p-8 text-center">
          <div className="text-3xl font-bold text-orange-500">
            {devices && devices.filter(d => d.status === 'warning').length}
          </div>
          <div className="text-base text-gray-400 mt-2">设备警告</div>
        </div>
        <div className="industrial-card p-8 text-center">
          <div className="text-3xl font-bold text-red-500">
            {devices && devices.filter(d => d.status === 'offline').length}
          </div>
          <div className="text-base text-gray-400 mt-2">设备离线</div>
        </div>
        <div className="industrial-card p-8 text-center">
          <div className="text-3xl font-bold text-blue-500">
            {sensorData && sensorData.filter(s => s.status === 'normal').length}
          </div>
          <div className="text-base text-gray-400 mt-2">传感器正常</div>
        </div>
      </div>
    </div>
  );
};

export default MonitorPage;