const express = require('express');
const health = require('./routes/health');

const app = express();
app.use(express.json());

// health endpoint
app.use('/', health);

module.exports = app;
