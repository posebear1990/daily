# Daily Blog 部署指南

## 部署方式

### 方式一：一键部署（推荐）

```bash
./deploy.sh
```

这个脚本会自动：
1. 打包项目文件
2. 上传到 VPS
3. 在 VPS 上构建 Docker 镜像
4. 启动容器

### 方式二：手动部署

#### 1. 上传文件到 VPS

```bash
rsync -avz --exclude='node_modules' --exclude='.cache' --exclude='public' --exclude='.git' ./ root@YOUR_VPS_IP:/opt/daily-blog/
```

#### 2. SSH 登录到 VPS

```bash
ssh root@YOUR_VPS_IP
```

#### 3. 在 VPS 上部署

```bash
cd /opt/daily-blog
docker-compose up -d --build
```

## VPS 环境准备

首次部署前，需要在 VPS 上安装 Docker 和 Docker Compose：

```bash
# 安装 Docker
curl -fsSL https://get.docker.com | sh

# 启动 Docker
systemctl start docker
systemctl enable docker

# 安装 Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

## 常用命令

### 查看容器状态
```bash
ssh root@YOUR_VPS_IP "docker ps"
```

### 查看容器日志
```bash
ssh root@YOUR_VPS_IP "docker logs daily-blog"
```

### 停止容器
```bash
ssh root@YOUR_VPS_IP "cd /opt/daily-blog && docker-compose down"
```

### 重启容器
```bash
ssh root@YOUR_VPS_IP "cd /opt/daily-blog && docker-compose restart"
```

### 更新部署
```bash
./deploy.sh
```

## 访问地址

部署成功后，访问：http://YOUR_VPS_IP

## 换 VPS 迁移步骤

1. 修改 `deploy.sh` 中的 `VPS_HOST` 变量为新的 IP
2. 在新 VPS 上安装 Docker 和 Docker Compose
3. 运行 `./deploy.sh` 即可完成迁移

## 文件说明

- `Dockerfile`: Docker 镜像构建文件（多阶段构建，优化镜像大小）
- `docker-compose.yml`: Docker Compose 配置文件
- `nginx.conf`: Nginx 服务器配置
- `deploy.sh`: 一键部署脚本
- `.dockerignore`: Docker 构建时忽略的文件
