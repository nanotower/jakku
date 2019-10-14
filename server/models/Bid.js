const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const bidSchema = new Schema({
  owner:{ type: Schema.Types.ObjectId, ref: "User" },
  productsList: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  bundlesList: [{ type: Schema.Types.ObjectId, ref: "Bundle" }],
  deadLine: Date,
  from: String,
  to: String,
  location: { type: { type: String }, coordinates: [Number], address: String},
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  active: {default: true},
});

const Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;
