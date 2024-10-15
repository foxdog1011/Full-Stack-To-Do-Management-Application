const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Authentication required.' });
  }

  try {
    const decoded = jwt.verify(token, '1011'); // 替换为实际密钥
    console.log(decoded); // 检查解码内容
    req.user = { _id: decoded.userId }; // 确保 _id 或 userId 匹配
    console.log('req.user:', req.user);
    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid token.' });
  }
};

module.exports = auth;
