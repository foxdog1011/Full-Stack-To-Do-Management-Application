require('dotenv').config(); // 确保这一行位于 server.js 文件的顶部
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
app.use(express.json()); // 解析 JSON 请求体
app.use('/api/auth', authRoutes);
app.use('/api', todoRoutes); // 将路由挂载到 `/api`

// 连接到 MongoDB
mongoose.connect('mongodb://localhost:27017/my-todo-app')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
