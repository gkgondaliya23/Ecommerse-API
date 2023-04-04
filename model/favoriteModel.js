const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
});

favoritesSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

favoritesSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model('Favorites', favoritesSchema);