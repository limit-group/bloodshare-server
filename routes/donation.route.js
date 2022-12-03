const express = require("express");
const {
  getDonationCentres,
  scheduleDonation,
  donationFeed,
} = require("../controllers/donation.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const router = express.Router();
router.get("/centres", isAuth, getDonationCentres);
router.post("/schedule", isAuth, scheduleDonation);
router.get("/feed", isAuth, donationFeed);
module.exports = router;
