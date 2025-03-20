const express = require('express');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const Sale = require('../models/Sale');
const router = express.Router();
const { Parser } = require('json2csv');
router.get('/export-sales', authenticate, authorize('admin'), async (req, res) => {
  const sales = await Sale.find().populate('productId salesmanId shopId');
  const fields = ['productId.name', 'quantitySold', 'totalAmount', 'saleDate', 'salesmanId.name', 'shopId.name'];
  const json2csv = new Parser({ fields });
  const csv = json2csv.parse(sales);
  res.header('Content-Type', 'text/csv');
  res.attachment('sales.csv');
  res.send(csv);
});

router.get('/sales-range', authenticate, authorize('admin'), async (req, res) => {
  const { start, end } = req.query;
  const sales = await Sale.find({ saleDate: { $gte: new Date(start), $lte: new Date(end) } });
  const totalSales = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  res.json({ totalSales, count: sales.length });
});

module.exports = router;
