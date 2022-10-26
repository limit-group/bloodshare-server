const express = require("express");
const {
  donationBroadcast,
  emergencyBroadcast,
  getDonationBroadcasts,
  getEmergencyBroadcast,
  singleDonationBroadCast,
} = require("../controllers/broadcast.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const router = express.Router();
router.get("/broadcasts", isAuth, getDonationBroadcasts);
router.get("/broadcasts/:broadcastId", isAuth, singleDonationBroadCast);
router.post("/broadcasts", isAuth, donationBroadcast);
router.post("/broadcasts/:broadcastId", isAuth, getDonationBroadcasts);
router.get("/e-broadcasts", isAuth, getEmergencyBroadcast);
router.post("/e-broadcasts", isAuth, emergencyBroadcast);
module.exports = router;
