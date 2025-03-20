const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: String,
  location: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  inventory: [{
    product: String,
    quantity: Number,
    price: Number
  }]
});

module.exports = mongoose.model('Shop', shopSchema);
