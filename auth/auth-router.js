const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../Users/users-model");

router.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200).json({
          token,
          id: user.id,
          username: user.username,
          message: `Welcome ${user.username}!`
        });
      } else {
        res.status(401).json({
          message: "Invalid Credentials"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
});

function signToken(user) {
  const payload = {
    id: user.id,
    username: user.username
  };
  const secret = process.env.JWT_SECRET;
  options = {
    expiresIn: "4h"
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
