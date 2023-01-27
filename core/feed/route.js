const express = require("express");
const { isAuth } = require("../../../middlewares/auth.middleware");
const { getDonationFeed, createDonationFeed } = require("./controller");
const router = express.Router();
router.get("/feeds", isAuth, getDonationFeed);
router.post("/feeds", isAuth, createDonationFeed);

module.exports = router;
