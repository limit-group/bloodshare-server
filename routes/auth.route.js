const express = require("express");
const {
  login,
  signup,
  register,
  endpoint,
  verifyMail,
  updatePassword,
  createUser,
  mobileSignup,
  mobileLogin,
} = require("../controllers/auth.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const router = express.Router();
router.get("", endpoint);
router.post("/login", login);
router.post("/mobileLogin", mobileLogin);
router.post("/signup", signup);
router.post("/mobileSignup", mobileSignup);
router.post("/register", register);
router.post("/verify", verifyMail);
router.post("/updatePassword", isAuth, updatePassword);
router.post("/create", isAuth, createUser);
module.exports = router;
