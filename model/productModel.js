const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {type: String, required:true, unique:true},
    description: {type: String, required:true},
     price: { type: Number, required: true },
    image: {type: String, required:true},
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    category: { type: String, required: true }
    // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  });

productSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

productSchema.set("toJSON", {
    virtuals: true,
});


exports.Product = mongoose.model('Product', productSchema);