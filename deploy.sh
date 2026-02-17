#!/bin/bash

# 部署脚本
# 使用方法: ./deploy.sh

set -e

echo "🚀 开始部署博客..."

# 配置变量
VPS_HOST="47.79.42.231"
VPS_USER="root"
REMOTE_DIR="/opt/daily-blog"
LOCAL_DIR="."

echo "🛠️ 1. 本地构建静态文件..."
npm run build

echo "📦 2. 打包项目文件..."
# 创建临时目录
TEMP_DIR=$(mktemp -d)
rsync -av --exclude='node_modules' \
          --exclude='.cache' \
          --exclude='.git' \
          --exclude='.DS_Store' \
          ${LOCAL_DIR}/ ${TEMP_DIR}/

echo "📤 3. 上传文件到 VPS..."
ssh ${VPS_USER}@${VPS_HOST} "mkdir -p ${REMOTE_DIR}"
rsync -avz --delete ${TEMP_DIR}/ ${VPS_USER}@${VPS_HOST}:${REMOTE_DIR}/

echo "🐳 4. 在 VPS 上启动 Docker 容器..."
ssh ${VPS_USER}@${VPS_HOST} << 'ENDSSH'
set -e

cd /opt/daily-blog

# 停止并删除旧容器
docker-compose down 2>/dev/null || true

# 拉取 nginx 镜像
docker-compose pull

# 启动容器
docker-compose up -d --force-recreate

# 清理未使用的镜像
docker image prune -f

echo "✅ 部署完成！"
echo "🌐 访问地址: http://47.79.42.231:8081"
ENDSSH

# 清理临时文件
rm -rf ${TEMP_DIR}

echo "🎉 部署成功完成！"
