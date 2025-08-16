const express = require('express');
const router = express.Router();

// Simple price endpoint (stubbed for development)
router.get('/', (req, res) => {
  res.json({
    BTC: 30000,
    ETH: 2000,
    USDT: 1
  });
});

module.exports = router;
