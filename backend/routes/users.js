const express = require("express");

const {
  login,
  signup,
} = require("../controllers/usersControllers");
const requireAuth = require("../requireAuth");

const router = express.Router();

router.post("/login", login);

router.post("/signup", requireAuth, signup);

module.exports = router;
