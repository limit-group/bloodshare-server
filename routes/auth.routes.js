const express = require("express");
const {
  login,
  signup,
  register,
  endpoint,
  verifyMail,
  updatePassword,
  createUser,
} = require("../controllers/auth.controllers");
const router = express.Router();

router.get("", endpoint);
router.post("/login", login);
router.post("/signup", signup);
router.post("/register", register);
router.post("/verify", verifyMail);
router.post("/update-password", updatePassword)
router.post("/new-password", createUser)

module.exports = router;
