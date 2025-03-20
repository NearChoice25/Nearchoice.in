const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  quantity: Number,
  category: String
});

module.exports = mongoose.model('Product', productSchema);
