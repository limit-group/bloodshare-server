const express = require("express");
const {
  getUserProfile,
  addUserProfile,
  updateUserProfile,
} = require("../controllers/profile.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const router = express.Router();
router.get("/profiles", isAuth, getUserProfile);
router.post("/profiles", isAuth, addUserProfile);
router.post("/profiles/update", isAuth, updateUserProfile);
module.exports = router;
