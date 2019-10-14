const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const productSchema = new Schema({
  owner:{ type: Schema.Types.ObjectId, ref: "User" },
  bid: { type: Schema.Types.ObjectId, ref: "Bid" },
  name: String,
  description: String,
  imgPath1: {
    type: String,
    default: "https://screenshotlayer.com/images/assets/placeholder.png"
  },
  // imgPath2: {
  //   type: String,
  //   default: "https://screenshotlayer.com/images/assets/placeholder.png"
  // },
  // imgPath3: {
  //   type: String,
  //   default: "https://screenshotlayer.com/images/assets/placeholder.png"
  // },
  price: Number,
  isBundle: [{ type: Schema.Types.ObjectId, ref: "Bundle" }],
  active: { type: Boolean,
    default: true},
  buyer: { type: Schema.Types.ObjectId, ref: "User" },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
