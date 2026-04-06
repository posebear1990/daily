# 使用 Nginx 作为 Web 服务器
FROM nginx:alpine

# 复制网站文件到 Nginx 默认目录
COPY . /usr/share/nginx/html/

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
