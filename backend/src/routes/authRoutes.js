// backend/src/routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// 用戶註冊
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 檢查是否已經存在用戶
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: '用戶名已存在' });
    }

    // 創建新用戶
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: '用戶註冊成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

// 用戶登入
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 查找用戶
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: '無效的用戶名或密碼' });
    }

    // 比較密碼
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: '無效的用戶名或密碼' });
    }

    // 生成 JWT Token
    const payload = { userId: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

module.exports = router; // 確保這裡是直接導出 router
