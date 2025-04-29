const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.authenticate = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password);
  return ok ? user : null;
};
