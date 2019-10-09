const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

router.get('/profile/:id', (req, res, next) => {
  console.log(req.user)
  User.findById(req.user._id)
  .populate('products')
  .populate('bundles')
  .then(user => {
    console.log(user);
    res.json(user);
  })
});


router.put('/edit-profile/:id', (req, res, next) => {
  const {_id} = req.user;
  let {username, password, email } = req.body;
    User.findByIdAndUpdate(_id,  req.body, {new:true})
    .then(userUpdated=> {
      res.json(userUpdated);    
    }).catch(error => next(error));


});
router.post('/edit-profile/photo/:id', uploadCloud.single('imgPath'), (req, res, next) => {
  const {_id} = req.user;
    const imgName= req.file.originalname;
    const imgPath= req.file.url;
    User.findByIdAndUpdate(_id,  {imgPath: imgPath, imgName: imgName}, {new:true})
    .then(userUpdated=> {
      res.json(userUpdated);
    }).catch(error => next(error));
});



module.exports = router;