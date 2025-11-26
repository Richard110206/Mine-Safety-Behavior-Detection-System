'use client';

import React from 'react';
import { AnalyticsData } from '@/types';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

interface AnalyticsPageProps {
  analyticsData: AnalyticsData;
}

const COLORS = {
  primary: '#ea580c',
  secondary: '#dc2626',
  tertiary: '#16a34a',
  quaternary: '#2563eb',
  gray: '#6b7280'
};

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ analyticsData }) => {
  if (!analyticsData) return null;

  const resolutionRate = analyticsData.totalAlerts > 0
    ? (analyticsData.resolvedAlerts / analyticsData.totalAlerts * 100).toFixed(1)
    : '0';

  const deviceOnlineRate = (analyticsData.devicesOnline + analyticsData.devicesOffline) > 0
    ? (analyticsData.devicesOnline / (analyticsData.devicesOnline + analyticsData.devicesOffline) * 100).toFixed(1)
    : '0';

  return (
    <div className="space-y-12 page-transition">
      {/* 关键指标卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="industrial-card p-8">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-red-900 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <span className="text-sm text-gray-400">本月</span>
          </div>
          <div className="text-3xl font-bold text-white">{analyticsData?.totalAlerts || 0}</div>
          <div className="text-base text-gray-400 mt-2">总告警数</div>
        </div>

        <div className="industrial-card p-8">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-sm text-green-400">{resolutionRate}%</span>
          </div>
          <div className="text-3xl font-bold text-white">{analyticsData?.resolvedAlerts || 0}</div>
          <div className="text-base text-gray-400 mt-2">已解决告警</div>
        </div>

        <div className="industrial-card p-8">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-orange-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-sm text-gray-400">活跃</span>
          </div>
          <div className="text-3xl font-bold text-white">{analyticsData?.pendingAlerts || 0}</div>
          <div className="text-base text-gray-400 mt-2">待处理告警</div>
        </div>

        <div className="industrial-card p-8">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-blue-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-sm text-green-400">{deviceOnlineRate}%</span>
          </div>
          <div className="text-3xl font-bold text-white">{analyticsData?.devicesOnline || 0}</div>
          <div className="text-base text-gray-400 mt-2">在线设备</div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 周告警趋势 */}
        <div className="industrial-card p-8">
          <h3 className="text-xl font-semibold text-orange-500 mb-6">周告警趋势</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData?.weeklyTrend || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis
                dataKey="day"
                stroke="#a0a0a0"
                tick={{ fill: '#a0a0a0', fontSize: 12 }}
              />
              <YAxis
                stroke="#a0a0a0"
                tick={{ fill: '#a0a0a0', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#2d2d2d',
                  border: '1px solid #404040',
                  borderRadius: '8px'
                }}
                itemStyle={{ color: '#e5e5e5' }}
                labelStyle={{ color: '#a0a0a0' }}
              />
              <Legend
                wrapperStyle={{ color: '#a0a0a0' }}
              />
              <Line
                type="monotone"
                dataKey="alerts"
                stroke={COLORS.primary}
                strokeWidth={3}
                dot={{ fill: COLORS.primary, r: 6 }}
                activeDot={{ r: 8 }}
                name="告警数量"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 告警类型分布 */}
        <div className="industrial-card p-8">
          <h3 className="text-xl font-semibold text-orange-500 mb-6">告警类型分布</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData?.alertDistribution || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {analyticsData.alertDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === 0 ? COLORS.primary :
                      index === 1 ? COLORS.secondary :
                      COLORS.tertiary
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#2d2d2d',
                  border: '1px solid #404040',
                  borderRadius: '8px'
                }}
                itemStyle={{ color: '#e5e5e5' }}
                labelStyle={{ color: '#a0a0a0' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 传感器指标 */}
      <div className="industrial-card p-6">
        <h3 className="text-lg font-semibold text-orange-500 mb-4">环境传感器指标</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {analyticsData?.sensorMetrics?.map((metric, index) => {
            const statusColor = metric.current > metric.max * 0.8
              ? 'text-red-500'
              : metric.current > metric.max * 0.6
                ? 'text-orange-500'
                : 'text-green-500';

            const statusBg = metric.current > metric.max * 0.8
              ? 'bg-red-900 border-red-700'
              : metric.current > metric.max * 0.6
                ? 'bg-orange-900 border-orange-700'
                : 'bg-green-900 border-green-700';

            return (
              <div key={index} className={`p-4 rounded-lg border ${statusBg}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">{metric.name}</span>
                  <span className={`text-xs ${statusColor} font-medium`}>
                    {metric.current > metric.max * 0.8 ? '危险' :
                     metric.current > metric.max * 0.6 ? '警告' : '正常'}
                  </span>
                </div>

                <div className={`text-2xl font-bold ${statusColor} mb-1`}>
                  {metric.current.toFixed(1)}
                  <span className="text-sm text-gray-400 ml-1">{metric.unit}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>平均值: {metric.average.toFixed(1)} {metric.unit}</span>
                    <span>最大值: {metric.max.toFixed(1)} {metric.unit}</span>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        metric.current > metric.max * 0.8
                          ? 'bg-red-500'
                          : metric.current > metric.max * 0.6
                            ? 'bg-orange-500'
                            : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((metric.current / metric.max) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 详细统计表格 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 设备状态统计 */}
        <div className="industrial-card p-6">
          <h3 className="text-lg font-semibold text-orange-500 mb-4">设备状态统计</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">在线设备</span>
              </div>
              <span className="text-lg font-semibold text-green-500">
                {analyticsData?.devicesOnline || 0}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">离线设备</span>
              </div>
              <span className="text-lg font-semibold text-red-500">
                {analyticsData?.devicesOffline || 0}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <span className="text-sm">设备在线率</span>
              <span className="text-lg font-semibold text-blue-500">
                {deviceOnlineRate}%
              </span>
            </div>
          </div>
        </div>

        {/* 告警处理效率 */}
        <div className="industrial-card p-6">
          <h3 className="text-lg font-semibold text-orange-500 mb-4">告警处理效率</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <span className="text-sm">总告警数</span>
              <span className="text-lg font-semibold text-white">
                {analyticsData?.totalAlerts || 0}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <span className="text-sm">已解决告警</span>
              <span className="text-lg font-semibold text-green-500">
                {analyticsData?.resolvedAlerts || 0}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <span className="text-sm">解决率</span>
              <span className="text-lg font-semibold text-blue-500">
                {resolutionRate}%
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <span className="text-sm">待处理告警</span>
              <span className="text-lg font-semibold text-orange-500">
                {analyticsData?.pendingAlerts || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;