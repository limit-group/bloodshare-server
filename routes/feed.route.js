const express = require("express");
const {
  getDonationFeed,
  createDonationFeed,
  myDonations,
  donated,
} = require("../controllers/feed.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const router = express.Router();
router.get("/feeds", isAuth, getDonationFeed);
router.post("/feeds", isAuth, createDonationFeed);
router.get("/donations", isAuth, myDonations);
router.post("/donations", isAuth, donated);
module.exports = router;
