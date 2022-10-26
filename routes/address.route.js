const express = require("express");
const {
  getFacilityAddress,
  getUserAddress,
} = require("../controllers/address.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const router = express.Router();
router.get("/user", isAuth, getUserAddress);
router.get("/facility/:id", isAuth, getFacilityAddress);
module.exports = router;
