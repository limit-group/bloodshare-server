const express = require("express");
const { getDonationCentres } = require("../controllers/donation.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const router = express.Router();
router.get("/centres", isAuth, getDonationCentres);
module.exports = router;
