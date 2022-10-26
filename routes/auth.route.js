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
const router = express.Router();

router.get("", endpoint);
router.post("/login", login);
router.post("/mobileLogin", mobileLogin);
router.post("/signup", signup);
router.post("/mobileSignup", mobileSignup)
router.post("/register", register);
router.post("/verify", verifyMail);
router.post("/updatePassword", updatePassword)
router.post("/create", createUser)


module.exports = router;
