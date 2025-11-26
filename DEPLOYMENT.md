# 矿井不安全行为识别检测调度系统 - 快速部署指南

## 🚀 一键部署到 Vercel（推荐）

### 方法 1: GitHub + Vercel（推荐）

1. **推送到 GitHub**
   ```bash
   git add .
   git commit -m "初始化矿井安全监控系统"
   git branch -M main
   git remote add origin https://github.com/你的用户名/mine-safety-system.git
   git push -u origin main
   ```

2. **部署到 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - 点击 "Deploy"

3. **完成！** 🎉
   - 系统会自动部署并提供访问链接
   - 之后每次推送代码都会自动更新

### 方法 2: Vercel CLI 部署

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel --prod
   ```

### 方法 3: 手动构建部署

1. **构建项目**
   ```bash
   npm run build
   ```

2. **本地测试**
   ```bash
   npm start
   ```

3. **部署到其他平台**
   - 将 `.next` 文件夹和 `public` 文件夹上传到服务器
   - 配置 Node.js 环境
   - 运行 `npm start`

## 📋 部署前检查清单

### 环境要求
- ✅ Node.js 18+
- ✅ npm 或 yarn
- ✅ Git

### 项目文件检查
- ✅ 所有代码文件已提交
- ✅ package.json 包含所有依赖
- ✅ next.config.js 配置正确
- ✅ 静态文件在 public 目录

### 构建测试
```bash
# 清理缓存
rm -rf .next

# 安装依赖
npm install

# 测试构建
npm run build

# 本地测试
npm start
```

## 🔧 Vercel 配置文件

项目已包含 `vercel.json` 配置文件：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 🌐 自定义域名

### Vercel 域名配置
1. 登录 Vercel 控制台
2. 选择你的项目
3. 点击 "Settings" → "Domains"
4. 添加你的域名
5. 配置 DNS 记录

### DNS 配置示例
```
Type    Name    Value
A       @       76.76.19.61
CNAME   www     cname.vercel-dns.com
```

## 🛠️ 常见问题解决

### 构建失败
```bash
# 清理并重新安装
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 部署后页面空白
- 检查控制台错误信息
- 确认所有数据文件存在
- 验证 API 路由正确

### 权限问题
```bash
# 设置正确的文件权限
chmod +x scripts/deploy.sh
```

### 内存不足
- 优化图片大小
- 减少 useEffect 数量
- 使用 memo 优化组件

## 📊 性能优化

### 代码分割
```javascript
// 动态导入组件
const MonitorPage = dynamic(() => import('./pages/MonitorPage'));
```

### 图片优化
```javascript
// 使用 Next.js Image 组件
import Image from 'next/image';
<Image src="/image.jpg" alt="描述" width={500} height={300} />
```

### 缓存策略
```javascript
// 在 next.config.js 中配置
module.exports = {
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  }
};
```

## 🔒 安全配置

### 环境变量
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://your-api.com
SECRET_KEY=your-secret-key
```

### HTTPS 强制
```javascript
// 在 next.config.js 中
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ]
      }
    ];
  }
};
```

## 📈 监控和分析

### Vercel Analytics
1. 项目设置 → Analytics
2. 启用数据分析
3. 查看访问统计

### 自定义监控
```javascript
// 添加性能监控
export function reportWebVitals(metric) {
  // 发送到分析服务
  console.log(metric);
}
```

## 🔄 CI/CD 集成

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🎯 生产环境优化

### 静态资源 CDN
- 使用 Vercel Edge Network
- 配置图片优化
- 启用 Gzip 压缩

### 数据库连接
- 使用连接池
- 实现查询缓存
- 监控连接状态

### 错误处理
```javascript
// 全局错误处理
function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
}
```

## 📞 技术支持

### 官方文档
- [Next.js 文档](https://nextjs.org/docs)
- [Vercel 文档](https://vercel.com/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

### 社区支持
- GitHub Issues
- Stack Overflow
- Discord 社区

---

## ✅ 部署成功确认

部署完成后，请确认以下功能正常：

- [x] 首页加载正常
- [x] 页面导航切换
- [x] 实时监控页面
- [x] 告警管理功能
- [x] 数据分析图表
- [x] 摄像头调用
- [x] 响应式设计
- [x] 动画效果

**🎉 恭喜！矿井安全监控系统已成功部署！**