const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const tradeRoutes = require('./routes/tradeRoutes');
const priceRoutes = require('./routes/priceRoutes');
app.use('/api/trade', tradeRoutes);
app.use('/api/prices', priceRoutes);

// Export app for testing. Only start server if this file is executed directly.
if (require.main === module) {
  const HOST = process.env.HOST || '0.0.0.0';
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, HOST, () => {
    console.log(`Backend running on http://${HOST}:${PORT} (NODE_ENV=${process.env.NODE_ENV || 'development'})`);
  });

  // Improve crash visibility on platforms like Fly: log unhandled errors and exit.
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err && err.stack ? err.stack : err);
    // exit so Fly can detect a failed machine and restart or report failure
    process.exit(1);
  });

  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err && err.stack ? err.stack : err);
    process.exit(1);
  });
}

module.exports = app;