const binanceService = require('../services/binanceService');

exports.placeOrder = async (req, res) => {
  try {
    const order = await binanceService.placeMarketOrder(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
