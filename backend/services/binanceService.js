const Binance = require('binance-api-node').default;

// Safe mode for development: set BINANCE_MODE=mock to avoid real orders.
const isMock = process.env.BINANCE_MODE === 'mock' || !process.env.BINANCE_API_KEY || !process.env.BINANCE_API_SECRET;

let client = null;
if (!isMock) {
  client = Binance({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRET,
  });
}

exports.placeMarketOrder = async ({ symbol, side, quantity }) => {
  if (isMock) {
    // Return a deterministic mock response for local testing/dev
    return {
      symbol,
      side,
      type: 'MARKET',
      quantity,
      status: 'FILLED',
      executedAt: new Date().toISOString(),
      mock: true,
      note: 'This is a mock response. Set BINANCE_MODE=live and provide API keys for real orders.'
    };
  }

  // Live mode: forward to Binance client
  return await client.order({
    symbol,
    side,
    type: 'MARKET',
    quantity,
  });
};
// backend/services/binanceService.js - Binance API service (supports mock/live modes)