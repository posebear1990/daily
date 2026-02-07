# Daily Blog

一个基于 Gatsby 的个人日常博客系统。

## 项目简介

这是一个简洁的个人博客系统，用于记录日常生活、技术笔记和个人想法。

## 技术栈

- **前端框架**: Gatsby (React)
- **部署方式**: Docker + Docker Compose
- **Web 服务器**: Nginx
- **容器化**: Docker

## 本地开发

### 环境要求

- Node.js 14+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run develop
```

访问 http://localhost:8000 查看开发环境。

### 构建生产版本

```bash
npm run build
```

## 部署

详细的部署说明请参考 [DEPLOY.md](./DEPLOY.md)。

### 快速部署

```bash
./deploy.sh
```

该脚本会自动完成打包、上传、构建和部署的全部流程。

## 项目结构

```
daily/
├── src/              # 源代码目录
├── content/          # 博客内容（Markdown 文件）
├── static/           # 静态资源
├── Dockerfile        # Docker 镜像构建文件
├── docker-compose.yml # Docker Compose 配置
├── nginx.conf        # Nginx 配置
├── deploy.sh         # 一键部署脚本
└── gatsby-config.js  # Gatsby 配置文件
```

## 常用命令

```bash
# 开发
npm run develop

# 构建
npm run build

# 本地预览构建结果
npm run serve

# 清理缓存
npm run clean

# 部署到 VPS
./deploy.sh
```

## License

MIT
