const express = require("express");
const router = express.Router();
const Bid = require("../models/Bid");
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
  Product.findByIdAndDelete(req.params.id).then(() => {
    User.findById(req.user._id)
      .populate("products")
      .then(products => {
        res.json(products);
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