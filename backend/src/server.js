import mongoose from 'mongoose';
import app from './app.js';
import cfg from './config/index.js';


mongoose.connect(cfg.mongoUri)
  .then(() => {
    app.listen(cfg.port, () => console.log(`API on ${cfg.port}`));
  })
  .catch((e) => console.error(e));
