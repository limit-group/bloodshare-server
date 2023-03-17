const express = require("express");
const { isAuth } = require("../middlewares/auth.middleware");
const {
  myDonations,
  donated,
  allDonations,
  createRecord,
  getRecords,
  getAllRecords,
} = require("../controllers/donation.controller");
const router = express.Router();
router.get("/donations", isAuth, allDonations);
router.post("/donations", isAuth, donated);
router.get("/donations/me", isAuth, myDonations);
router.post("/records", isAuth, createRecord);
router.get("/records", isAuth, getAllRecords);
router.get("/records/me", isAuth, getRecords);
module.exports = router;
