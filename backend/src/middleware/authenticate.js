// backend/src/middleware/authenticate.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 確認 Authorization 標頭存在且格式正確
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 驗證 JWT Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 將解碼後的資料存儲在 req.user
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ error: 'Authentication required.' });
  }
};

module.exports = authenticate; // 確保這裡是直接導出函數
