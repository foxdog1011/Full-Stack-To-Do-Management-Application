require('dotenv').config();          // 讀 .env
const connectDB = require('./config/db');
const app = require('./app');        //  Express app

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log('Server running on', PORT));
  })
  .catch((e) => {
    console.error('❌  MongoDB connect failed:', e.message);
    process.exit(1);                 // 連線失敗就結束，避免跑在半死狀態
  });
