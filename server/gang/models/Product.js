const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const productSchema = new Schema({
  owner:{ type: Schema.Types.ObjectId, ref: "User" },
  name: String,
  description: String,
  email: String,
  imgPath: {
    type: String,
  },
  price: Number,
  isBundle: [{ type: Schema.Types.ObjectId, ref: "Bundle" }],
  active: {default: true},
  buyer: { type: Schema.Types.ObjectId, ref: "User" },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
