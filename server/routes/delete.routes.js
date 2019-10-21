const express = require("express");
const router = express.Router();
const Bid = require("../models/Bid");
const User = require("../models/User")
const Product = require("../models/Product");
const Bundle = require("../models/Bundle");


router.delete("/bid/:id", (req, res, next) => {
  console.log("delete bid")
  Bid.findByIdAndDelete(req.params.id).then((deleted) => {
    console.log("deleted" + req.params.id);
    res.json(deleted)
  });
});
router.delete("/product/:id", (req, res, next) => {
  let userId= req.user._id
  let productId= req.params.id
  Product.findByIdAndRemove(productId)
  .then((prod) => {
    User.findByIdAndUpdate(userId, {$pull: {products: productId}}, {new: true})
      .populate("products")
      .populate("bid")
      .then(user => {
        console.log("res delete%%%%%%%%%%%%%%%%%%%%%%%%%%", prod, "&&&&&&&&&&&", user)
        res.json(user);
      });
  });
});

router.delete("/bundle/:id", (req, res, next) => {
  Bundle.findByIdAndDelete(req.params.id).then(() => {
    User.findById(req.user._id)
      .populate("bundles")
      .then(bundles => {
        res.json(bundles);
      });
  });
});


module.exports = router;