// backend/src/routes/health.js
const express = require('express');
const router = express.Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', ts: Date.now() });
});

module.exports = router;
