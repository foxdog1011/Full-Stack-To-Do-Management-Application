const express = require('express');
const health = require('./routes/health');
const auth = require('./routes/auth');

const app = express();
app.use(express.json());
app.use('/', health);
app.use('/api/auth', auth);

module.exports = app;
