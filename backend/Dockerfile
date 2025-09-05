# 使用官方 Node.js LTS 版本作為基礎映像
FROM node:18

# 設定工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製應用程式程式碼
COPY . .

# 暴露後端伺服器埠
EXPOSE 5000

# 啟動應用程式
CMD ["npm", "start"]
