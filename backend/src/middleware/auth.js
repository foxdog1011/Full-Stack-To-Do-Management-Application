const { verify } = require('../utils/jwt');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    res.locals.user = verify(token); // { sub, role }
    next();
  } catch {
    res.sendStatus(401);
  }
};
