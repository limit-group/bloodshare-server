const express = require("express");
const { getDonationCentres } = require("../controllers/donation.controller");
const router = express.Router();

router.get("/centres", getDonationCentres);
module.exports = router;
