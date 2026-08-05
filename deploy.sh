#!/bin/bash

# 部署脚本
# 使用方法: ./deploy.sh

set -euo pipefail

echo "🚀 开始部署博客..."

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="${PROJECT_DIR}/.env"
ENV_EXAMPLE_FILE="${PROJECT_DIR}/.env.example"

if [[ ! -f "${ENV_FILE}" ]]; then
  cp "${ENV_EXAMPLE_FILE}" "${ENV_FILE}"
  echo "[ERROR] 未找到 .env，已从 .env.example 创建。请填入 token 后重试。" >&2
  exit 1
fi

set -a
source "${ENV_FILE}"
set +a

if [[ -z "${CLOUDFLARE_WEB_ANALYTICS_TOKEN:-}" || "${CLOUDFLARE_WEB_ANALYTICS_TOKEN}" == "REPLACE_WITH_CF_WEB_ANALYTICS_TOKEN" ]]; then
  echo "[ERROR] 请先在 .env 设置 CLOUDFLARE_WEB_ANALYTICS_TOKEN。" >&2
  exit 1
fi

# 配置变量
VPS_HOST="website-vps.xiaoxiong.app"
VPS_USER="root"
REMOTE_DIR="/opt/daily-blog"
SITE_URL="${SITE_URL:-https://daily.xiaoxiong.app/}"
LOCAL_DIR="${PROJECT_DIR}"

echo "🛠️ 1. 本地构建静态文件..."
(cd "${PROJECT_DIR}" && npm run build)

echo "📦 2. 打包项目文件..."
# 创建临时目录
TEMP_DIR=$(mktemp -d)
trap 'rm -rf "${TEMP_DIR}"' EXIT
rsync -av --exclude='node_modules' \
          --exclude='.cache' \
          --exclude='.git' \
          --exclude='.DS_Store' \
          --exclude='.env' \
          --exclude='.env.example' \
          "${LOCAL_DIR}/" "${TEMP_DIR}/"

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
ENDSSH

echo "🎉 部署成功完成！"
echo "🌐 访问地址: ${SITE_URL}"
