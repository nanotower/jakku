const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 5;

const login = (req, user) => {
  return new Promise((resolve,reject) => {
    req.login(user, err => {
      console.log('req.login ')
      console.log(user)

      
      if(err) {
        reject(new Error('Something went wrong'))
      }else{
        resolve(user);
      }
    })
  })
}

router.post("/login", (req,res,next) => {
  passport.authenticate('local', function(err, user, errinfo) {
    if (err)  next(new Error("Something went wrong"));
    if (!user) next(errinfo)
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.status(200).json(req.user);
    });
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    next(new Error('You must provide valid credentials'));
  }

  User.findOne({ username })
  .then(foundUser => {
    if (foundUser) throw new Error('Username already exists');

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    return newUser.save();
  })
  .then( savedUser => {
    return login(req, savedUser)
  })
  .then(user => {
    res.json({status: 'signup & login successfully', user});
  })
  .catch(err => next(err))
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({message:"logged out"});
});

router.get('/currentuser', (req,res,next) => {
  if(req.user){
    console.log("user va", req.user)
    User.findById(req.user._id)
    .populate('bid')
    .populate('products')
    .populate('purchases')
    .then(user => {
      console.log("currentuser", req.user)
      res.status(200).json(user);

    })
    
  }else{
    next(new Error('Not logged in'))
  }
})

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
  );
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", {


      // heroku URL
      // successRedirect: "https://jakkuapp.herokuapp.com",

      // Local URl dev
      successRedirect: `${process.env.REACT_URL}`,


       // heroku URL
      // failureRedirect: "https://jakkuapp.herokuapp.com/auth/login"

      // Local URl dev
      failureRedirect: `${process.env.REACT_URL}/auth/login`
    })
);



module.exports = router;
