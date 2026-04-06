# Xiaoxiong 个人主页

> 维护状态说明：该主页资源已并入 `daily` 仓库统一维护（见 `daily/static/xiaoxiaoxiaoxiong-home`）。本仓库建议只读保留。

一个简洁的个人主页，带有星空特效和 Live2D 看板娘。

## 项目简介

这是一个静态个人主页网站，包含：
- 星空背景特效
- Live2D 看板娘（Rem）
- 网易云音乐播放器
- 响应式设计

## 技术栈

- **前端**: HTML + CSS + JavaScript
- **特效库**: jQuery, Canvas Sparkles
- **看板娘**: Live2D
- **部署方式**: Docker + Nginx
- **容器化**: Docker Compose

## 本地开发

### 方式一：使用 Node.js 服务器

```bash
node server.js
```

访问 http://localhost:8888 查看效果。

### 方式二：使用 Docker

```bash
docker-compose up
```

访问 http://localhost 查看效果。

## 部署

详细的部署说明请参考 [DEPLOY.md](./DEPLOY.md)。

### 快速部署到 VPS

```bash
./deploy.sh
```

该脚本会自动完成打包、上传、构建和部署的全部流程。

## 项目结构

```
xiaoxiaoxiaoxiong/
├── index.html          # 主页面
├── server.js           # 本地开发服务器
├── asset/              # 静态资源（样式、图片等）
├── lib/                # 第三方库
│   ├── jquery.min.js
│   ├── jquery-canvas-sparkles.js
│   └── live2d/         # Live2D 相关文件
├── src/                # 源代码
├── Dockerfile          # Docker 镜像构建文件
├── docker-compose.yml  # Docker Compose 配置
├── nginx.conf          # Nginx 配置
└── deploy.sh           # 一键部署脚本
```

## 自定义配置

### 修改 Live2D 模型

编辑 `index.html` 第 56 行：

```javascript
loadlive2d("live2d", "/lib/live2d/model/rem/rem.json");
```

将 `rem/rem.json` 替换为其他模型路径。

### 修改音乐播放器

编辑 `index.html` 第 37 行的网易云音乐外链地址。

### Cloudflare Web Analytics

1. 复制 `.env.example` 为 `.env`。
2. 在 `.env` 中设置 `CLOUDFLARE_WEB_ANALYTICS_TOKEN`。
3. 执行 `./deploy.sh` 时会自动把 token 注入到部署产物。

## License

MIT
