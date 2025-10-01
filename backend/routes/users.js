const express = require("express");

const {
  login,
  signup,
  getAllUsers,
  editUserLikeAdmin,
  updateUser,
} = require("../controllers/usersControllers");
const requireAuth = require("../requireAuth");

const router = express.Router();

router.patch("/adm", requireAuth, editUserLikeAdmin)

router.put('/', updateUser);

router.get("/all", requireAuth, getAllUsers)

router.post("/login", login);

router.post("/signup", requireAuth, signup);

module.exports = router;
