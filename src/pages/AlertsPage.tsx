'use client';

import React, { useState, useMemo } from 'react';
import { Alert, AlertType, AlertStatus, Priority } from '@/types';
import { Filter, AlertTriangle, CheckCircle, Clock, X, Eye } from 'lucide-react';

interface AlertsPageProps {
  alerts: Alert[];
  onAlertStatusChange: (alertId: string, status: AlertStatus) => void;
  onAlertSelect: (alert: Alert) => void;
}

const AlertsPage: React.FC<AlertsPageProps> = ({
  alerts,
  onAlertStatusChange,
  onAlertSelect
}) => {
  const [filters, setFilters] = useState({
    type: 'all' as AlertType | 'all',
    status: 'all' as AlertStatus | 'all',
    priority: 'all' as Priority | 'all',
    timeRange: 'all' as 'all' | '24h' | '7d' | '30d'
  });

  const filteredAlerts = useMemo(() => {
    if (!alerts || !Array.isArray(alerts)) return [];

    const now = new Date();

    return alerts.filter(alert => {
      // 类型筛选
      if (filters.type !== 'all' && alert.type !== filters.type) return false;

      // 状态筛选
      if (filters.status !== 'all' && alert.status !== filters.status) return false;

      // 优先级筛选
      if (filters.priority !== 'all' && alert.priority !== filters.priority) return false;

      // 时间范围筛选
      if (filters.timeRange !== 'all') {
        const diffMs = now.getTime() - alert.timestamp.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        switch (filters.timeRange) {
          case '24h':
            if (diffHours > 24) return false;
            break;
          case '7d':
            if (diffHours > 24 * 7) return false;
            break;
          case '30d':
            if (diffHours > 24 * 30) return false;
            break;
        }
      }

      return true;
    });
  }, [alerts, filters]);

  const getAlertTypeLabel = (type: AlertType) => {
    switch (type) {
      case 'helmet': return '未戴安全帽';
      case 'track': return '跨越轨道';
      case 'gas': return '气体超标';
      default: return type;
    }
  };

  const getAlertTypeColor = (type: AlertType) => {
    switch (type) {
      case 'helmet': return 'bg-blue-600';
      case 'track': return 'bg-orange-600';
      case 'gas': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-900 border-red-700';
      case 'medium': return 'text-orange-500 bg-orange-900 border-orange-700';
      case 'low': return 'text-blue-500 bg-blue-900 border-blue-700';
      default: return 'text-gray-500 bg-gray-900 border-gray-700';
    }
  };

  const getStatusIcon = (status: AlertStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'processing':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: AlertStatus) => {
    switch (status) {
      case 'pending': return '未处理';
      case 'processing': return '处理中';
      case 'resolved': return '已解决';
      default: return status;
    }
  };

  return (
    <div className="space-y-6 page-transition">
      {/* 筛选区域 */}
      <div className="industrial-card p-4">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-orange-500 mr-2" />
          <h2 className="text-lg font-semibold text-orange-500">告警筛选</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 类型筛选 */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">告警类型</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as any }))}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
            >
              <option value="all">全部类型</option>
              <option value="helmet">未戴安全帽</option>
              <option value="track">跨越轨道</option>
              <option value="gas">气体超标</option>
            </select>
          </div>

          {/* 状态筛选 */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">处理状态</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as any }))}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
            >
              <option value="all">全部状态</option>
              <option value="pending">未处理</option>
              <option value="processing">处理中</option>
              <option value="resolved">已解决</option>
            </select>
          </div>

          {/* 优先级筛选 */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">优先级</label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value as any }))}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
            >
              <option value="all">全部优先级</option>
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </div>

          {/* 时间范围筛选 */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">时间范围</label>
            <select
              value={filters.timeRange}
              onChange={(e) => setFilters(prev => ({ ...prev, timeRange: e.target.value as any }))}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-orange-500 focus:outline-none"
            >
              <option value="all">全部时间</option>
              <option value="24h">最近24小时</option>
              <option value="7d">最近7天</option>
              <option value="30d">最近30天</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            共找到 <span className="text-orange-500 font-semibold">{filteredAlerts.length}</span> 条告警记录
          </div>
          <button
            onClick={() => setFilters({
              type: 'all',
              status: 'all',
              priority: 'all',
              timeRange: 'all'
            })}
            className="text-sm text-orange-500 hover:text-orange-400"
          >
            重置筛选
          </button>
        </div>
      </div>

      {/* 告警统计 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="industrial-card p-4 text-center">
          <div className="text-2xl font-bold text-yellow-500">
            {filteredAlerts.filter(a => a.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-400">未处理</div>
        </div>
        <div className="industrial-card p-4 text-center">
          <div className="text-2xl font-bold text-orange-500">
            {filteredAlerts.filter(a => a.status === 'processing').length}
          </div>
          <div className="text-sm text-gray-400">处理中</div>
        </div>
        <div className="industrial-card p-4 text-center">
          <div className="text-2xl font-bold text-green-500">
            {filteredAlerts.filter(a => a.status === 'resolved').length}
          </div>
          <div className="text-sm text-gray-400">已解决</div>
        </div>
        <div className="industrial-card p-4 text-center">
          <div className="text-2xl font-bold text-red-500">
            {filteredAlerts.filter(a => a.priority === 'high' && a.status !== 'resolved').length}
          </div>
          <div className="text-sm text-gray-400">高优先级待处理</div>
        </div>
      </div>

      {/* 告警列表 */}
      <div className="industrial-card p-4">
        <h2 className="text-lg font-semibold text-orange-500 mb-4">告警列表</h2>

        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>暂无符合条件的告警记录</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAlerts.map(alert => (
              <div
                key={alert.id}
                className={`
                  p-4 rounded-lg border transition-all duration-200
                  ${alert.status === 'pending' && alert.priority === 'high'
                    ? 'bg-red-900 border-red-700 alert-blink'
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-750'}
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getAlertTypeColor(alert.type)}`}>
                        {getAlertTypeLabel(alert.type)}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(alert.priority)}`}>
                        {alert.priority === 'high' ? '高' : alert.priority === 'medium' ? '中' : '低'}优先级
                      </span>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(alert.status)}
                        <span className="text-xs text-gray-400">{getStatusLabel(alert.status)}</span>
                      </div>
                    </div>

                    <h3 className="text-white font-semibold mb-1">{alert.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{alert.description}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>位置: {alert.location}</span>
                      <span>时间: {alert.timestamp.toLocaleString()}</span>
                      {alert.deviceId && <span>设备: {alert.deviceId}</span>}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => onAlertSelect(alert)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      title="查看详情"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {alert.status === 'pending' && (
                      <button
                        onClick={() => onAlertStatusChange(alert.id, 'processing')}
                        className="p-2 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
                        title="标记处理中"
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                    )}

                    {alert.status === 'processing' && (
                      <button
                        onClick={() => onAlertStatusChange(alert.id, 'resolved')}
                        className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                        title="标记已解决"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;