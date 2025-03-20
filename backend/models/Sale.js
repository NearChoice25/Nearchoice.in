const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantitySold: Number,
  saleDate: { type: Date, default: Date.now },
  salesmanId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  totalAmount: Number
});

module.exports = mongoose.model('Sale', saleSchema);
