# 矿井不安全行为识别检测调度系统

基于 AI 视觉识别的矿井安全监控与告警管理系统前端展示平台，采用 Next.js + TypeScript + Tailwind CSS 开发，具有工业风格的界面设计。

## 🎯 项目特色

- **工业风设计**: 专为矿井监控室场景设计的深色主题界面
- **实时监控**: 调用本地摄像头进行视频流监控，支持截图功能
- **告警管理**: 完整的告警筛选、管理和详情查看功能
- **数据分析**: 可视化图表展示各类统计数据
- **响应式设计**: 完美适配大屏、笔记本和移动设备
- **纯前端实现**: 无需后端依赖，所有数据硬编码模拟

## 🚀 核心功能

### 1. 实时监控页面
- 📹 摄像头设备列表展示
- 🎥 本地摄像头调用和视频流显示
- 📸 视频截图功能
- 🌡️ 环境传感器数据实时展示
- 📊 设备状态统计

### 2. 告警管理页面
- 🔍 多维度告警筛选（类型、状态、优先级、时间范围）
- 📋 告警列表详细展示
- 🎯 告警详情弹窗查看
- ⚡ 快速状态更新（未处理→处理中→已解决）
- 📈 告警统计数据

### 3. 数据分析页面
- 📊 周告警趋势图表
- 🥧 告警类型分布饼图
- 🎯 关键指标卡片展示
- 🌡️ 环境传感器详细数据
- 📋 设备状态和处理效率统计

## 🛠️ 技术栈

- **框架**: Next.js 16
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **图表**: Recharts
- **图标**: Lucide React
- **动画**: CSS3 + Custom Keyframes

## 📦 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式和动画
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── components/            # 通用组件
│   ├── Navigation.tsx     # 导航组件
│   ├── AlertModal.tsx     # 告警详情弹窗
│   ├── LoadingSpinner.tsx # 加载动画
│   └── StatusIndicator.tsx # 状态指示器
├── pages/                 # 页面组件
│   ├── MonitorPage.tsx    # 实时监控页
│   ├── AlertsPage.tsx     # 告警管理页
│   └── AnalyticsPage.tsx  # 数据分析页
├── hooks/                 # 自定义 Hooks
│   └── useAppState.tsx    # 应用状态管理
├── types/                 # TypeScript 类型定义
│   └── index.ts
├── data/                  # 模拟数据
│   └── mockData.ts
└── utils/                 # 工具函数
```

## 🎨 设计风格

### 配色方案
- **主色调**: 深灰色系 (#1a1a1a, #2d2d2d, #3a3a3a)
- **告警红**: #dc2626
- **警告橙**: #ea580c (主品牌色)
- **安全绿**: #16a34a
- **信息蓝**: #2563eb

### 动画效果
- 页面切换淡入效果
- 告警项目闪烁提醒
- 按钮悬停提升效果
- 状态指示器脉冲动画
- 数字统计滚动动画

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm/yarn/pnpm

### 安装依赖
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看项目

### 构建生产版本
```bash
npm run build
npm run start
```

## 🌐 Vercel 部署

### 一键部署（推荐）

1. 将代码推送到 GitHub 仓库
2. 访问 [Vercel](https://vercel.com)
3. 点击 "New Project"
4. 选择你的 GitHub 仓库
5. 点击 "Deploy"

### 手动部署
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel --prod
```

## 📱 功能演示

### 实时监控
- 选择左侧设备列表查看不同监控点
- 点击"开启摄像头"调用本地摄像头
- 支持实时截图查看
- 右侧显示环境传感器数据，超标自动标红

### 告警管理
- 使用顶部筛选器过滤告警
- 点击告警项目查看详情
- 支持快速状态更新
- 高优先级告警自动闪烁提醒

### 数据分析
- 查看告警趋势图表
- 了解告警类型分布
- 监控环境传感器指标
- 掌握设备在线状态

## 🔧 自定义配置

### 修改模拟数据
编辑 `src/data/mockData.ts` 文件：
```typescript
export const mockDevices = [
  // 修改设备数据
];

export const mockAlerts = [
  // 修改告警数据
];

export const mockSensorData = [
  // 修改传感器数据
];
```

### 调整样式主题
编辑 `src/app/globals.css` 中的 CSS 变量：
```css
:root {
  --accent-red: #dc2626;      /* 告警红 */
  --accent-orange: #ea580c;   /* 警告橙 */
  --accent-green: #16a34a;    /* 安全绿 */
  /* 更多颜色变量... */
}
```

## 🤝 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目基于 MIT 许可证开源

## 📞 技术支持

如在使用过程中遇到问题，请：
1. 查看控制台错误信息
2. 确认 Node.js 和 npm 版本
3. 尝试删除 `node_modules` 和 `package-lock.json` 后重新安装

---

⚡ **本项目专为大创项目设计，可直接用于演示和展示**
