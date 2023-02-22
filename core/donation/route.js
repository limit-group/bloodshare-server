const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
const { myDonations, donated, allDonations } = require("./controller");
const router = express.Router();
router.get("/donations", isAuth, allDonations);
router.post("/donations", isAuth, donated);
router.get("/donations/me", isAuth, myDonations);
module.exports = router;
