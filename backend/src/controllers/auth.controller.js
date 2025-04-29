const { sign } = require('../utils/jwt');
const { authenticate } = require('../services/auth.service');

exports.login = async (req, res, next) => {
  try {
    const user = await authenticate(req.body.email, req.body.password);
    if (!user) return res.sendStatus(401);
    res.json({ token: sign({ sub: user.id, role: user.role }) });
  } catch (e) {
    next(e);
  }
};
