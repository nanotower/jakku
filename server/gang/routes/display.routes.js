const express = require("express");
const passport = require('passport');
const router = express.Router();
const Bid = require("../models/Bid");
const Product = require("../models/Product");
const Bundle = require("../models/Bundle");


router.get("/all-bids", (req, res, next) => {
  Bid.find()
    .populate("owner")
    .populate("bundlesList")
    .then(allBids => {
      console.log("resdata %%%%%%%"+allBids)
      res.json(allBids);
    })
    .catch(error => next(error));
});
router.get("/all-bundles", (req, res, next) => {
  Bundle.find()
    .populate("owner")
    .populate("products")
    .then(allBundles => {
      console.log("resdata %%%%%%%"+allBundles)
      res.json(allBundles);
    })
    .catch(error => next(error));
});
router.get("/all-products", (req, res, next) => {
  Product.find()
    .populate("owner")
    .populate("isBundle")
    .then(allProducts => {
      console.log("resdata %%%%%%%"+allProducts)
      res.json(allProducts);
    })
    .catch(error => next(error));
});

router.get("/bid-info/:id", (req, res, next) => {
  const id = req.params.id;
  Bid.findById(id)
    .populate("owner")
    .populate("productsList")
    .populate("bundlesList")
    .then(bid => {
      res.json(bid);
    })
    .catch(error => next(error));
});
router.get("/product-info/:id", (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .populate("owner")
    .populate("isBundle")
    .then(product => {
      res.json(product);
    })
    .catch(error => next(error));
});
router.get("/bundle-info/:id", (req, res, next) => {
  const id = req.params.id;
  Bundle.findById(id)
    .populate("owner")
    .populate("products")
    .then(bundle => {
      res.json(bundle);
    })
    .catch(error => next(error));
});








module.exports = router;
