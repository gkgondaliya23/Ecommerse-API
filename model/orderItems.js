const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quntity: { type: Number, required:true },
})

orderItemSchema.virtual("id").get(function () {
    return this._id.toHexString();
  });
  
orderItemSchema.set("toJSON", {
    virtuals: true,
  });

  
module.exports = mongoose.model('OrderItems', orderItemSchema);