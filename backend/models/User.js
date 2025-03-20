const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'shop_owner', 'salesman'], default: 'salesman' },
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' } // only for owners/salesmen
});

module.exports = mongoose.model('User', userSchema);
