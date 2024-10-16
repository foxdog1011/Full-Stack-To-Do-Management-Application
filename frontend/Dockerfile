# 使用官方 Node.js 镜像作为基础镜像
FROM node:18 AS build

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json 并安装依赖
COPY package*.json ./
RUN npm install

# 复制整个前端应用程序
COPY . .

# 设置环境变量（如果需要）
ARG JWT_SECRET
ARG MONGO_URI

ENV JWT_SECRET=1011
ENV MONGO_URI=mongodb://mongo:27017/my-todo-app

# 构建前端应用
RUN npm run build

# 使用 Nginx 作为基础镜像来提供构建后的静态文件
FROM nginx:alpine

# 复制构建后的静态文件到 Nginx 的 html 目录
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# 复制自定义的 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
