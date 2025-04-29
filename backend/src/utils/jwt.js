const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'DEV_SECRET';

exports.sign = (payload) =>
  jwt.sign(payload, SECRET, { algorithm: 'HS256', expiresIn: '2h' });

exports.verify = (token) => jwt.verify(token, SECRET);
