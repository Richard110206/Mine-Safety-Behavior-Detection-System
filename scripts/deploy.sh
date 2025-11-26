#!/bin/bash

# 矿井不安全行为识别检测调度系统部署脚本

echo "🚀 开始部署矿井安全监控系统..."

# 检查 Node.js 版本
echo "📋 检查环境..."
node_version=$(node -v | cut -d'v' -f2)
required_version="18"

if [ "$(printf '%s\n' "$required_version" "$node_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo "❌ Node.js 版本过低，需要 v18 或更高版本"
    exit 1
fi

echo "✅ Node.js 版本检查通过: $node_version"

# 安装依赖
echo "📦 安装依赖..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ 依赖安装失败"
    exit 1
fi

# 运行测试构建
echo "🔨 构建测试..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败，请检查代码"
    exit 1
fi

echo "✅ 构建成功"

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📥 安装 Vercel CLI..."
    npm install -g vercel
fi

# 部署到 Vercel
echo "🌐 部署到 Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "🎉 部署成功！"
    echo "📱 现在可以访问你的矿井安全监控系统了"
else
    echo "❌ 部署失败，请检查 Vercel 配置"
    exit 1
fi