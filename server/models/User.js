const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  imgPath: {
    type: String,
    default:
      "http://www.jdevoto.cl/web/wp-content/uploads/2018/04/default-user-img.jpg"
  },
  token: String,
  active: {
    type: Boolean,
    default: false
  },
  googleID: {
    type: String
  },
  bid: { type: Schema.Types.ObjectId, ref: "Bid" },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  bundles: [{ type: Schema.Types.ObjectId, ref: "Bundle" }],
  purchases: [{ type: Schema.Types.ObjectId, ref: "Product" }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
