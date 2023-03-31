const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItems' }],
  totalPrice: {type: Number},
  dateOrdered: { type: Date, default: Date.now() },
});

orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orderSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model('Order', orderSchema);