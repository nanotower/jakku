const express = require("express");
const passport = require("passport");
const router = express.Router();
const Bid = require("../models/Bid");
const Product = require("../models/Product");
const Bundle = require("../models/Bundle");
const uploadCloud = require("../configs/cloudinary.config");

router.put("/bid/:id", (req, res, next) => {
  console.log("&&&");
  Bid.create({
    deadLine: req.body.deadLine,
    from: req.body.from,
    to: req.body.to,
    bundlesList: req.body.bundlesList,
    productsList: req.body.productsList
  })
    .then(bid => {
      Bid.findByIdAndUpdate(
        req.params.id,
        {
          deadLine: bid.deadLine,
          from: bid.from,
          to: bid.to,
          bundlesList: bid.bundlesList,
          productsList: bid.productsList
        },
        { new: true }
      )
        .then(updatedBid => {
          console.log("udaptedbid%%%%" + updatedBid);
          res.json(updatedBid);
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

router.put("/product/:id", (req, res, next) => {
  console.log("&&&");
  Product.create({
    name: req.body.name,
    description: req.body.description,
    imgPath1: req.body.imgPath1,
    imgPath2: req.body.imgPath2,
    imgPath3: req.body.imgPath3,
    price: req.body.price
  })
    .then(product => {
      Product.findByIdAndUpdate(
        req.params.id,
        {
          name: product.name,
          description: product.description,
          imgPath1: product.imgPath1,
          imgPath2: product.imgPath2,
          imgPath3: product.imgPath3,
          price: product.price
        },
        { new: true }
      )
        .then(updatedProduct => {
          console.log("udaptedbid%%%%" + updatedProduct);
          res.json(updatedProduct);
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

router.put("/bundle/:id", (req, res, next) => {
  console.log("&&&");
  Bundle.create({
    title: req.body.title,
    description: req.body.description,
    products: req.body.products,
    imgPath: req.body.imgPath,
    price: req.body.price
  })
    .then(bundle => {
      Bundle.findByIdAndUpdate(
        req.params.id,
        {
          title: bundle.title,
          description: bundle.description,
          imgPath1: bundle.imgPath1,
          products: bundle.products,
          price: bundle.price
        },
        { new: true }
      )
        .then(updatedBundle => {
          console.log("udaptedbid%%%%" + updatedBundle);
          res.json(updatedBundle);
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
});

router.put(
  "/product/:photoN/:id",
  uploadCloud.single("imgPath"),
  (req, res, next) => {
    const id = req.params.id;
    if (req.params.photoN == "imgPath1") {
      const imgPath1 = req.file.url;
      Product.findByIdAndUpdate(id, { imgPath1: imgPath1 }, { new: true })
        .then(userUpdated => {
          res.json(userUpdated);
        })
        .catch(error => next(error));
    }
    if (req.params.photoN == "imgPath2") {
      const imgPath2 = req.file.url;
      Product.findByIdAndUpdate(id, { imgPath2: imgPath2 }, { new: true })
        .then(userUpdated => {
          res.json(userUpdated);
        })
        .catch(error => next(error));
    }
    if (req.params.photoN == "imgPath3") {
      const imgPath3 = req.file.url;
      Product.findByIdAndUpdate(id, { imgPath3: imgPath3 }, { new: true })
        .then(userUpdated => {
          res.json(userUpdated);
        })
        .catch(error => next(error));
    }
  }
);

router.put("/buy-product/:id", (req, res, next) => {
  console.log("&&&");
  const buyer = req.user._id
  Product.findByIdAndUpdate(
    req.params.id,
    {
     active: false,
     buyer
    },
    { new: true }
  ) 
  .populate("owner")
  .populate("isBundle")
  .populate("bid")
    .then(updatedProduct => {
      console.log("udaptedbid%%%%" + updatedProduct);
      res.json(updatedProduct);
    })
    .catch(error => next(error));
});
router.put("/buy-bundle/:id", (req, res, next) => {
  console.log("&&&");
  const buyer = req.user._id
  Bundle.findByIdAndUpdate(
    req.params.id,
    {
     active: false,
     buyer: owner
    },
    { new: true }
  )
    .then(updatedBundle => {
      console.log("udaptedbid%%%%" + updatedBundle);
      res.json(updatedBundle);
    })
    .catch(error => next(error));
});

module.exports = router;
