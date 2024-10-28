# 使用官方 Node.js 镜像作为基礎镜像
FROM node:18 AS build

# 設置工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 package-lock.json 並安装依赖
COPY package*.json ./
RUN npm install

# 複製整個應用程式程式碼
COPY . .

# 構建前端應用
RUN npm run build

# 使用 Nginx 作為基礎映像
FROM nginx:alpine

# 複製構建好的前端應用程式到 Nginx 預設目錄
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# 複製 Nginx 配置檔
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]
