const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const cfg = require('../config');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password, roles } = req.body || {};
    if (!username || !password) return res.status(400).json({ message: 'username and password required' });

    const exists = await User.findOne({ username });
    if (exists) return res.status(409).json({ message: 'username already exists' });

    const user = new User({ username, roles: roles || ['user'] });
    user.password = password;
    await user.save();

    res.status(201).json({ id: user._id, username: user.username, roles: user.roles });
  } catch (e) {
    res.status(500).json({ message: 'internal error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ message: 'username and password required' });

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'invalid credentials' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'invalid credentials' });

    const token = jwt.sign(
      { sub: user._id.toString(), username: user.username, roles: user.roles },
      cfg.jwtSecret,
      { expiresIn: '1h' }
    );
    res.status(200).json({ token });
  } catch (e) {
    res.status(500).json({ message: 'internal error' });
  }
});

module.exports = router;
