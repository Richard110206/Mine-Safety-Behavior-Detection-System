'use client';

import React from 'react';
import { PageType } from '@/types';
import { Camera, AlertTriangle, BarChart3 } from 'lucide-react';

interface NavigationProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    {
      type: 'monitor' as PageType,
      label: '实时监控',
      icon: Camera,
      description: '设备状态与视频流'
    },
    {
      type: 'alerts' as PageType,
      label: '告警管理',
      icon: AlertTriangle,
      description: '告警处理与记录'
    },
    {
      type: 'analytics' as PageType,
      label: '数据分析',
      icon: BarChart3,
      description: '统计报表与趋势'
    }
  ];

  return (
    <nav className="industrial-card border-t-4 border-orange-600 mb-6">
      <div className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl lg:text-3xl font-bold text-orange-500 mb-2">
              矿井不安全行为识别检测系统
            </h1>
            <p className="text-gray-400 text-sm lg:text-base">
              Mine Safety Behavior Recognition & Detection System
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 lg:gap-4">
            {navItems.map(({ type, label, icon: Icon, description }) => (
              <button
                key={type}
                onClick={() => onPageChange(type)}
                className={`
                  relative p-3 lg:p-4 rounded-lg transition-all duration-300 transform
                  ${currentPage === type
                    ? 'bg-orange-600 text-white shadow-lg scale-105'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
                  }
                `}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  <div>
                    <div className="text-xs lg:text-sm font-semibold">{label}</div>
                    <div className="text-xs lg:text-xs opacity-75 hidden lg:block">
                      {description}
                    </div>
                  </div>
                </div>
                {currentPage === type && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;