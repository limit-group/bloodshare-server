const express = require("express");
const {
  getUserProfile,
  addUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/profile.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const router = express.Router();
router.get("/user", isAuth, getUserProfile);
router.post("/user", isAuth, addUserProfile);
router.post("/update", isAuth, updateUserProfile);
router.delete("/delete", isAuth, deleteUserProfile);
module.exports = router;
