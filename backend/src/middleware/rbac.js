module.exports =
  (roles) =>
  (_req, res, next) =>
    roles.includes(res.locals.user.role) ? next() : res.sendStatus(403);
