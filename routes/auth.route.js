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
router.post("/m-login", mobileLogin);
router.post("/signup", signup);
router.post("/m-signup", mobileSignup)
router.post("/register", register);
router.post("/verify", verifyMail);
router.post("/update-password", updatePassword)
router.post("/create-user", createUser)


module.exports = router;
