const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Bid = require("../models/Bid");
const Product = require("../models/Product");
const Bundle = require("../models/Bundle");
const Photo = require("../models/Photo");
const uploadCloud = require('../configs/cloudinary.config');

router.post("/new-bid", (req, res, next) => {
  let {deadLine, from, to} = req.body.state
  console.log("&&&&&&&6", req.body.state)
  
  let {lat, lng, address} = req.body.state.location

  Bid.create({ 
    owner: req.user._id,
    deadLine: deadLine,
    from: from,
    to: to,
    location: {
      coordinates: [lng, lat],
      type: 'Point',
      address: address
    }
  })
  .then(created => {
    User.findByIdAndUpdate(req.user._id, {bid: created._id}, { new: true })
    .then(() => {
    res.json(created);
    console.log("created&&&&&&&&&&&", created)
    })
  })
})

router.post("/new-product", (req, res, next) => {
  const{name, description, imgPath1, imgPath2, imgPath3, price, bid} = req.body.state;
  const owner= req.user._id;
  console.log("$$$$$$", req.body)
  Product.create({ 
    owner,
    bid,
    name,
    description,
    imgPath1,
    imgPath2,
    imgPath3,
    price
  })
  .then(created => {
    res.json(created);
    console.log("created&&&&&&&&&&&", created)
  })
})

router.post('/new-product/photo', uploadCloud.single('photo'), (req, res, next) => {
  const imgName = req.file.originalname;
  const newPhoto = new Photo({imgName})
  console.log(req.file.url)
  res.json(req.file.url)
  // newPhoto.save()
  // .then(photo => {
  //   res.json({url: req.file, photo: photo});
  // })
  // .catch(error => {
  //   console.log(error);
  // })
});



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
