const jwt = require('jsonwebtoken');
const cfg = require('../config');

function requireAuth(req, res, next) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'missing token' });
  try {
    req.user = jwt.verify(token, cfg.jwtSecret);
    next();
  } catch {
    res.status(401).json({ message: 'invalid token' });
  }
}
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user?.roles?.includes(role)) return res.status(403).json({ message: 'forbidden' });
    next();
  };
}
module.exports = { requireAuth, requireRole };
