// src/middleware/authenticate.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 確認 Authorization 標頭存在且格式正確
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '授權失敗：無效的標頭' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 驗證 JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 將解碼後的資料存儲在 req.user
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: '授權失敗：無效的 Token' });
  }
};

module.exports = authenticate; // 確保這裡是直接導出函數
