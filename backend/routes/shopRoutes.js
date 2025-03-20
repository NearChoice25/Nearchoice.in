const express = require('express');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const Shop = require('../models/Shop');
const router = express.Router();

router.post('/', authenticate, authorize('admin', 'shop_owner'), async (req, res) => {
  const shop = new Shop({ ...req.body, owner: req.user.id });
  await shop.save();
  res.status(201).json(shop);
});

// Get Shops by Location
router.get('/location/:location', authenticate, async (req, res) => {
  const shops = await Shop.find({ location: req.params.location });
  res.json(shops);
});


module.exports = router;
