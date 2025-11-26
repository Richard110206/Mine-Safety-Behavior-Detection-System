'use client';

import React from 'react';
import { CheckCircle, AlertTriangle, Clock, XCircle } from 'lucide-react';

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'warning' | 'pending' | 'processing' | 'resolved';
  showText?: boolean;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  showText = false,
  text,
  size = 'md',
  className = ''
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
      case 'resolved':
        return {
          color: 'text-green-500 bg-green-900',
          icon: CheckCircle,
          defaultText: status === 'online' ? '在线' : '已解决'
        };
      case 'offline':
        return {
          color: 'text-red-500 bg-red-900',
          icon: XCircle,
          defaultText: '离线'
        };
      case 'warning':
      case 'processing':
        return {
          color: 'text-orange-500 bg-orange-900',
          icon: AlertTriangle,
          defaultText: status === 'warning' ? '警告' : '处理中'
        };
      case 'pending':
        return {
          color: 'text-yellow-500 bg-yellow-900',
          icon: Clock,
          defaultText: '待处理'
        };
      default:
        return {
          color: 'text-gray-500 bg-gray-900',
          icon: Clock,
          defaultText: '未知'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`
        ${sizeClasses[size]} ${status === 'online' || status === 'resolved' ? 'animate-pulse' : ''}
      `}>
        <Icon className={`w-full h-full ${status === 'online' || status === 'resolved' ? 'text-green-500' :
          status === 'offline' ? 'text-red-500' :
          status === 'warning' || status === 'processing' ? 'text-orange-500' :
          'text-yellow-500'}`} />
      </div>
      {showText && (
        <span className={`
          ${textSizeClasses[size]} ${config.color} px-2 py-1 rounded-full font-medium
        `}>
          {text || config.defaultText}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;