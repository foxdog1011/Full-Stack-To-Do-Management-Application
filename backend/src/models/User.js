const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  roles: { type: [String], default: ['user'] },
}, { timestamps: true });

userSchema.virtual('password')
  .set(function (plain) { this._password = plain; })
  .get(function () { return this._password; });

userSchema.pre('save', async function (next) {
  if (!this._password) return next();
  this.passwordHash = await bcrypt.hash(this._password, 10);
  next();
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
