# 多阶段构建
# 第一阶段：构建应用
FROM node:18-alpine AS builder

WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 安装依赖
RUN npm ci --legacy-peer-deps

# 复制源代码
COPY . .

# 构建静态文件
RUN npm run build

# 第二阶段：运行 nginx
FROM nginx:alpine

# 复制构建好的静态文件到 nginx
COPY --from=builder /app/public /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
