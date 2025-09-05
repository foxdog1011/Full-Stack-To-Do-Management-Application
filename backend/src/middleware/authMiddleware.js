const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Authentication required.' });
  }

  try {
    const decoded = jwt.verify(token, '1011');
    console.log('Decoded Token:', decoded);
    req.user = { _id: decoded.userId || decoded._id };
    console.log('req.user:', req.user);
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).send({ error: 'Invalid token.' });
  }
};

module.exports = auth;
