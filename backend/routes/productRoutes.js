const express = require('express');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', authenticate, authorize('shopOwner'), upload.single('image'), (req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

const sendEmail = require('../utils/sendEmail');

router.post('/update-quantity/:id', authenticate, authorize('shopOwner'), async (req, res) => {
  const { quantity } = req.body;
  const product = await Product.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
  if (product.quantity < 10) {
    sendEmail('admin@example.com', 'Low Inventory Alert', `${product.name} is low on stock.`);
  }
  res.json(product);
});

// Get Products for a Shop
router.get('/shop/:shopId', authenticate, async (req, res) => {
  const products = await Product.find({ shopId: req.params.shopId });
  res.json(products);
});

// Update Product
router.put('/:id', authenticate, authorize('shop_owner'), async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete Product
router.delete('/:id', authenticate, authorize('shop_owner'), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

module.exports = router;
