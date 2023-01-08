const express = require("express");
const {
  endpoint,
  updatePassword,
  mobileSignup,
  mobileLogin,
  verifyPhone,
} = require("../controllers/auth.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const router = express.Router();
router.get("", endpoint);
router.post("/login", mobileLogin);
router.post("/signup", mobileSignup);
router.post("/verify", isAuth, verifyPhone);
router.post("/password", isAuth, updatePassword);
module.exports = router;
