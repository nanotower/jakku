const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");


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
    successRedirect: "http://localhost/3000",
    failureRedirect: "http://localhost/3000/auth/login"
  })
);

router.use((err, req, res,next) => {
  res.status(500).json({message:err.message});
});

module.exports = router;