const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Bid = require("../models/Bid");
const Product = require("../models/Product");
const Bundle = require("../models/Bundle");

router.post("/new-bid", (req, res, next) => {
  Bid.create({ 
    owner: req.user._id,
    deadLine: req.body.deadLine,
    from: req.body.from,
    to: req.body.to,
    location: req.body.location
  })
  .then(created => {
    res.json(created);
    console.log("created&&&&&&&&&&&", created)
  })
})

router.post("/new-product", (req, res, next) => {
  const{name, description, imgPath1, imgPath2, imgPath3, price} = req.body;
  const owner= req.user._id;
  Product.create({ 
    owner,
    name,
    description,
    imgPath1,
    imgPath2,
    imgPath3,
  })
  .then(created => {
    res.json(created);
    console.log("created&&&&&&&&&&&", created)
  })
})

router.post("/new-bundle", (req, res, next) => {
  console.log(req.body)
  const{title, description, products, price, imgPath} = req.body;
  const owner= req.user._id;
  Bundle.create({ 
    owner,
    title,
    description,
    products,
    price,
    imgPath,
  })
  .then(created => {
    res.json(created);
    console.log("created&&&&&&&&&&&", created)
  })
})
module.exports = router;
