const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const bundleSchema = new Schema({
  owner:{ type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  price: Number,
  active: { type: Boolean,
    default: true},
  imgPath: {
    type: String,
  },
  buyer: { type: Schema.Types.ObjectId, ref: "User" },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Bundle = mongoose.model('Bundle', bundleSchema);
module.exports = Bundle;
