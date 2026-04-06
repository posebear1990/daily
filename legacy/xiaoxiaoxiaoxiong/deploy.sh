#!/bin/bash

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="${PROJECT_DIR}/.env"
ENV_EXAMPLE_FILE="${PROJECT_DIR}/.env.example"
INDEX_FILE="${PROJECT_DIR}/index.html"

VPS_HOST="${VPS_HOST:-YOUR_VPS_IP}"
VPS_USER="${VPS_USER:-root}"
DEPLOY_PATH="${DEPLOY_PATH:-/opt/xiaoxiong-homepage}"
PROJECT_NAME="${PROJECT_NAME:-xiaoxiong-homepage}"

if [[ ! -f "${INDEX_FILE}" ]]; then
  echo "Missing index file: ${INDEX_FILE}" >&2
  exit 1
fi

if [[ ! -f "${ENV_FILE}" ]]; then
  cp "${ENV_EXAMPLE_FILE}" "${ENV_FILE}"
  echo "Created ${ENV_FILE} from .env.example. Please set token and retry." >&2
  exit 1
fi

set -a
source "${ENV_FILE}"
set +a

CF_TOKEN="${CLOUDFLARE_WEB_ANALYTICS_TOKEN:-}"
if [[ -z "${CF_TOKEN}" || "${CF_TOKEN}" == "REPLACE_WITH_CF_WEB_ANALYTICS_TOKEN" ]]; then
  echo "Please set CLOUDFLARE_WEB_ANALYTICS_TOKEN in ${ENV_FILE} before deploy." >&2
  exit 1
fi

echo "开始部署 ${PROJECT_NAME}..."

TEMP_DIR="$(mktemp -d)"
trap 'rm -rf "${TEMP_DIR}" "${PROJECT_DIR}/${PROJECT_NAME}.tar.gz"' EXIT

echo "准备部署文件并注入 Cloudflare token..."
rsync -av \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.DS_Store' \
  --exclude='*.tar.gz' \
  --exclude='.env' \
  --exclude='.env.example' \
  "${PROJECT_DIR}/" "${TEMP_DIR}/"

perl -0777 -i -pe "s/REPLACE_WITH_CF_WEB_ANALYTICS_TOKEN/${CF_TOKEN}/g" "${TEMP_DIR}/index.html"

echo "正在打包项目文件..."
(cd "${TEMP_DIR}" && tar -czf "${PROJECT_DIR}/${PROJECT_NAME}.tar.gz" .)

echo "正在上传到 VPS..."
scp "${PROJECT_DIR}/${PROJECT_NAME}.tar.gz" "${VPS_USER}@${VPS_HOST}:/tmp/"

echo "正在 VPS 上部署..."
ssh "${VPS_USER}@${VPS_HOST}" << EOF
    mkdir -p ${DEPLOY_PATH}
    cd ${DEPLOY_PATH}
    tar -xzf /tmp/${PROJECT_NAME}.tar.gz
    rm /tmp/${PROJECT_NAME}.tar.gz
    docker-compose down
    docker-compose up -d --build
    docker ps | grep ${PROJECT_NAME}
EOF

echo "部署完成！"
echo "访问地址: http://${VPS_HOST}"
