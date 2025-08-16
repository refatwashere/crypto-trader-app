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
  app.listen(process.env.PORT || 3000, () => {
    console.log('Backend running...');
  });
}

module.exports = app;