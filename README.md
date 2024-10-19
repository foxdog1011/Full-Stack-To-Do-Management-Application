# 全端待辦事項管理應用程式

## 一、專案概述

**概述**：
開發並部署了一個全端待辦事項管理應用程式，支持用戶註冊、登入及待辦事項的創建、編輯和刪除。此專案整合了 Docker、Kubernetes、CI/CD 流程，並成功部署到 AWS EKS，提升了應用的可擴展性與運維效率。

## 二、技術架構

- **前端**：React, Axios, React Router
- **後端**：Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **容器化與編排**：Docker, Kubernetes (EKS)
- **CI/CD**：GitHub Actions
- **雲端服務**：AWS (EKS, S3)
- **其他工具**：kubectl, eksctl

## 三、專案鏈接

- **GitHub**：[https://github.com/foxdog1011/Todo-App](https://github.com/foxdog1011/Todo-App)

## 四、安裝與運行

### 4.1 本地開發環境

#### 前端

1. **進入前端目錄**：
    ```bash
    cd frontend
    ```

2. **安裝依賴**：
    ```bash
    npm install
    ```

3. **設定環境變數**：
    - 在 `frontend/` 目錄下建立 `.env` 檔案，加入：
      ```env
      REACT_APP_API_URL=http://localhost:5000/api
      ```

4. **啟動前端開發伺服器**：
    ```bash
    npm start
    ```

#### 後端

1. **進入後端目錄**：
    ```bash
    cd backend
    ```

2. **安裝依賴**：
    ```bash
    npm install
    ```

3. **設定環境變數**：
    - 在 `backend/` 目錄下建立 `.env` 檔案，加入：
      ```env
      PORT=5000
      MONGODB_URI=mongodb://localhost:27017/todoapp
      JWT_SECRET=your_jwt_secret_key
      ```

4. **啟動後端開發伺服器**：
    ```bash
    npm run dev
    ```

### 4.2 使用 Docker Compose 部署

1. **確保 Docker 和 Docker Compose 已安裝**。

2. **在專案根目錄執行**：
    ```bash
    docker-compose up --build
    ```

3. **訪問應用**：
    - 前端應用程式將在 [http://localhost:3000](http://localhost:3000) 運行。
    - 後端 API 在 [http://localhost:5000/api](http://localhost:5000/api)。

## 五、持續整合與部署 (CI/CD)

- **GitHub Actions**：
  - 每次推送到 `main` 分支時，GitHub Actions 將自動執行以下步驟：
    1. 檢出程式碼
    2. 設定 Node.js 環境
    3. 安裝後端和前端依賴
    4. 運行後端和前端測試
    5. 建置並推送 Docker 映像到 Docker Hub
    6. 部署到 Kubernetes (EKS)

## 六、部署到雲端 (AWS EKS)

- **Kubernetes 配置**：
  - 使用 Kubernetes，簡化部署流程。

- **高可用性設計**：
  - 配置自動擴展和負載均衡，確保應用在高流量下穩定運行。

## 七、注意事項

- **環境變數**：
  - 確保在部署前正確設置所有必要的環境變數。

- **資源管理**：
  - Kubernetes 配置中的資源請求與限制應根據實際需求進行調整。

- **安全性**：
  - 定期更新依賴套件，修補已知漏洞。

---
