全端待辦事項管理應用程式
一、專案概述
概述： 開發並部署了一個全端待辦事項管理應用程式，支持用戶註冊、登入及待辦事項的創建、編輯和刪除。此專案整合了 Docker、Kubernetes、CI/CD 流程，並成功部署到 AWS EKS，提升了應用的可擴展性與運維效率。

二、技術架構
前端：React, Axios, React Router
後端：Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
容器化與編排：Docker, Kubernetes (EKS)
CI/CD：GitHub Actions
雲端服務：AWS (EKS, S3)
其他工具：kubectl, eksctl

三、專案鏈接
GitHub：https://github.com/foxdog1011/Todo-App

四、安裝與運行
5.1 本地開發環境
前端
進入前端目錄：
bash
複製程式碼
cd frontend
安裝依賴：
bash
複製程式碼
npm install
設定環境變數：
在 frontend/ 目錄下建立 .env 檔案，加入：
env
複製程式碼
REACT_APP_API_URL=http://localhost:5000/api
啟動前端開發伺服器：
bash
複製程式碼
npm start
後端
進入後端目錄：
bash
複製程式碼
cd backend
安裝依賴：
bash
複製程式碼
npm install
設定環境變數：
在 backend/ 目錄下建立 .env 檔案，加入：
env
複製程式碼
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todoapp
JWT_SECRET=your_jwt_secret_key
啟動後端開發伺服器：
bash
複製程式碼
npm run dev
5.2 使用 Docker Compose 部署
確保 Docker 和 Docker Compose 已安裝。
在專案根目錄執行：
bash
複製程式碼
docker-compose up --build
前端應用程式將在 http://localhost:3000 運行，後端 API 在 http://localhost:5000/api。
六、持續整合與部署 (CI/CD)
GitHub Actions：
每次推送到 main 分支時，GitHub Actions 將自動執行以下步驟：
檢出程式碼
設定 Node.js 環境
安裝後端和前端依賴
運行後端和前端測試
建置並推送 Docker 映像到 Docker Hub
部署到 Kubernetes (EKS)
七、部署到雲端 (AWS EKS)
Kubernetes 配置：
使用 Kubernetes，簡化部署流程。
高可用性設計：
配置自動擴展和負載均衡，確保應用在高流量下穩定運行。