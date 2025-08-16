const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/tradeController');

router.post('/', placeOrder);

module.exports = router;
