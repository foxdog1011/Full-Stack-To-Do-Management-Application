// backend/src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Authentication required.' });
  }

  try {
    const decoded = jwt.verify(token, '1011'); // 将 'your_actual_secret_key' 替换为你的 JWT 密钥
    console.log('Decoded Token:', decoded); // 检查解码内容
    req.user = { _id: decoded.userId || decoded._id }; // 根据生成 token 时的字段名来设置 _id
    console.log('req.user:', req.user); // 确保 req.user 设置正确
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).send({ error: 'Invalid token.' });
  }
};

module.exports = auth;
