const express        = require("express");
const authController = express.Router();
const passport       = require("passport");

const User           = require("../models/user");

const bcrypt         = require("bcrypt");
const bcryptSalt     = 19;

authController.post("/signup", (req, res, next) => {
  console.log("authController-signup1");
  let username = req.body.username;
  let password = req.body.password;
  let name     = req.body.name;
  let secret   = req.body.secret;

  if (!username || !password || !name || !secret) {
    res.status(400).json({ message: "Provide all the fields to sign up" });
  }
console.log("authController-signup2");
  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "The username already exists" });
      return;
    }

    let salt     = bcrypt.genSaltSync(bcryptSalt);
    let hashPass = bcrypt.hashSync(password, salt);

    let newUser  = User({
      username,
      password: hashPass,
      name,
      secret
    });

    console.log(newUser);
    console.log("authController-signup3");
    newUser.save((err) => {
      if (err) { res.status(400).json({ message: "Something went wrong" }); }
      else {
        req.login(newUser, (err) => {
          if (err) { return res.status(500).json({ message: "Something went wrong" }); }
          res.status(200).json(req.user);
        });
      }
    });
  });
});

authController.post("/login", (req, res, next) => {
  console.log(req.body.password);
  passport.authenticate("local", (err, user, info) => {
    if (err) { return res.status(401).json(err); }
    if (!user) { return res.status(401).json(info); }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Something went wrong" })
      };
      console.log("req.user logeado es: ",req.user);
      res.status(200).json(req.user); //quito el return
    });
  })(req, res, next);
});



authController.post("/logout", (req, res) => {
  console.log("in logout");
  req.logout();
  return res.status(200).json({ message: "Success" });
});

authController.get("/loggedin", (req, res) => {
  console.log("in authController-loggedin");
  if (req.isAuthenticated()) { return res.status(200).json(req.user); }
  return res.status(403).json({ message: "Unauthorized" });
});

authController.get("/private", (req, res) => {
  console.log("auth-privatedata");
  if (req.isAuthenticated()) { return res.json({ message: req.user.secret }); }
  return res.status(403).json({ message: "Unauthorized" });
});


module.exports = authController;
