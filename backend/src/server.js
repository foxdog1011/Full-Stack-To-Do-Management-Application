// backend/src/server.js
const mongoose = require('mongoose');
const app = require('./app');
const cfg = require('./config');

mongoose.connect(cfg.mongoUri)
  .then(() => {
    app.listen(cfg.port, () => console.log(`API on ${cfg.port}`));
  })
  .catch((e) => console.error(e));
