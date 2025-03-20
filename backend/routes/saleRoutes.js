const express = require('express');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const Sale = require('../models/Sale');
const Product = require('../models/Product');
const router = express.Router();

// Record Sale (Salesman)
router.post('/', authenticate, authorize('salesman'), async (req, res) => {
  const { productId, quantitySold } = req.body;
  const product = await Product.findById(productId);
  if (!product || product.quantity < quantitySold) {
    return res.status(400).json({ message: 'Insufficient stock' });
  }

  // Deduct from inventory
  product.quantity -= quantitySold;
  await product.save();

  const sale = new Sale({
    productId,
    quantitySold,
    salesmanId: req.user.id,
    shopId: product.shopId,
    totalAmount: product.price * quantitySold
  });

  await sale.save();
  res.status(201).json(sale);
});

// Get Sales by Shop
router.get('/shop/:shopId', authenticate, async (req, res) => {
  const sales = await Sale.find({ shopId: req.params.shopId }).populate('productId salesmanId');
  res.json(sales);
});

module.exports = router;
