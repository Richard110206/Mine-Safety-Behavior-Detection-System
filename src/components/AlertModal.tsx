'use client';

import React from 'react';
import { Alert, AlertStatus } from '@/types';
import { X, Camera, AlertTriangle, MapPin, Clock, CheckCircle, Activity } from 'lucide-react';

interface AlertModalProps {
  alert: Alert | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (alertId: string, status: AlertStatus) => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  alert,
  isOpen,
  onClose,
  onStatusChange
}) => {
  if (!isOpen || !alert) return null;

  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case 'helmet': return '未戴安全帽';
      case 'track': return '跨越轨道';
      case 'gas': return '气体超标';
      default: return type;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return priority;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-900 border-red-700';
      case 'medium': return 'text-orange-500 bg-orange-900 border-orange-700';
      case 'low': return 'text-blue-500 bg-blue-900 border-blue-700';
      default: return 'text-gray-500 bg-gray-900 border-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return '未处理';
      case 'processing': return '处理中';
      case 'resolved': return '已解决';
      default: return status;
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="industrial-card w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* 弹窗头部 */}
        <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-orange-500 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            告警详情
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* 弹窗内容 */}
        <div className="p-6 space-y-6">
          {/* 基本信息 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400">告警类型</label>
                <div className="mt-1 p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{getAlertTypeLabel(alert.type)}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">告警标题</label>
                <div className="mt-1 p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <span className="font-medium text-white">{alert.title}</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">描述</label>
                <div className="mt-1 p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <p className="text-gray-300">{alert.description}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400">优先级</label>
                <div className="mt-1 p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(alert.priority)}`}>
                    {getPriorityLabel(alert.priority)}优先级
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">位置信息</label>
                <div className="mt-1 p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-white">{alert.location}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">发生时间</label>
                <div className="mt-1 p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-white">{alert.timestamp.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 设备信息 */}
          {alert.deviceId && (
            <div>
              <label className="text-sm text-gray-400">相关设备</label>
              <div className="mt-1 p-3 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-green-500" />
                    <span className="text-white font-medium">{alert.deviceId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-500">在线</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 告警截图 */}
          {alert.snapshot && (
            <div>
              <label className="text-sm text-gray-400">告警截图</label>
              <div className="mt-1">
                <img
                  src={alert.snapshot}
                  alt="告警截图"
                  className="w-full rounded-lg border border-gray-700"
                />
              </div>
            </div>
          )}

          {/* 模拟传感器数据 */}
          <div>
            <label className="text-sm text-gray-400">周边环境监测</label>
            <div className="mt-1 grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">瓦斯浓度</span>
                  <Activity className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-lg font-bold text-white">0.8%</div>
                <div className="text-xs text-gray-500">正常范围</div>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg border border-orange-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">粉尘浓度</span>
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                </div>
                <div className="text-lg font-bold text-orange-400">8.5 mg/m³</div>
                <div className="text-xs text-orange-400">接近阈值</div>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">环境温度</span>
                  <Activity className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-lg font-bold text-white">28.5°C</div>
                <div className="text-xs text-gray-500">正常范围</div>
              </div>
            </div>
          </div>

          {/* 当前状态 */}
          <div>
            <label className="text-sm text-gray-400">当前状态</label>
            <div className="mt-1 p-3 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {alert.status === 'pending' && <Clock className="w-4 h-4 text-yellow-500" />}
                  {alert.status === 'processing' && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                  {alert.status === 'resolved' && <CheckCircle className="w-4 h-4 text-green-500" />}
                  <span className="text-white font-medium">{getStatusLabel(alert.status)}</span>
                </div>
                <div className={`
                  px-3 py-1 rounded-full text-sm
                  ${alert.status === 'pending' ? 'bg-yellow-900 text-yellow-500' :
                    alert.status === 'processing' ? 'bg-orange-900 text-orange-500' :
                    'bg-green-900 text-green-500'}
                `}>
                  {alert.status === 'pending' ? '等待处理' :
                   alert.status === 'processing' ? '正在处理' : '已解决'}
                </div>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
            {alert.status === 'pending' && (
              <button
                onClick={() => {
                  onStatusChange(alert.id, 'processing');
                  onClose();
                }}
                className="industrial-button px-6 py-2 flex items-center gap-2"
              >
                <Clock className="w-4 h-4" />
                标记处理中
              </button>
            )}
            {alert.status === 'processing' && (
              <button
                onClick={() => {
                  onStatusChange(alert.id, 'resolved');
                  onClose();
                }}
                className="industrial-button success px-6 py-2 flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                标记已解决
              </button>
            )}
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;