const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
const {
  mobileLogin,
  mobileSignup,
  verifyPhone,
  updatePassword,
  getUserProfile,
  addUserProfile,
  updateUserProfile,
  endpoint,
} = require("./controller");
const router = express.Router();
router.get("", endpoint);
router.post("/login", mobileLogin);
router.post("/signup", mobileSignup);
router.post("/verify", isAuth, verifyPhone);
router.post("/password", isAuth, updatePassword);
router.get("/profiles", isAuth, getUserProfile);
router.post("/profiles", isAuth, addUserProfile);
router.post("/profiles/update", isAuth, updateUserProfile);
module.exports = router;
