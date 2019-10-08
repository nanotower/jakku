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
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  bundles: [{ type: Schema.Types.ObjectId, ref: "Bundle" }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
