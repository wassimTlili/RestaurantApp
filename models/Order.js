// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [{
    name: String,
    quantity: Number,
    price: Number,
  }],
  totalAmount: Number,
  deliveryOption: { type: String, enum: ['restaurant', 'delivery'] },  // Delivery option
  status: { type: String, enum: ['pending', 'in-progress', 'completed', 'cancelled'], default: 'pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User model
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
