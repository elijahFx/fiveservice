const express = require("express");

const {
  login,
  signup,
  editUser,
  getAllUsers,
  editUserLikeAdmin,
  deleteSingleUser,
  uploadAvatar,
  upload
} = require("../controllers/usersControllers");
const { getUsersStatistics } = require("../calcs/userStatistics");
const requireAuth = require("../requireAuth");

const router = express.Router();

router.get("/:id/statistics", requireAuth, getUsersStatistics);

router.get("/", requireAuth, getAllUsers);

router.post("/login", login);

router.post("/signup", requireAuth, signup);

router.patch("/adm", requireAuth, editUserLikeAdmin);

router.put("/", requireAuth, editUser);

router.delete("/", requireAuth, deleteSingleUser);

router.post("/avatar", requireAuth, upload, uploadAvatar);

module.exports = router;
