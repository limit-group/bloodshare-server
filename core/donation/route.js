const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
const { myDonations, donated } = require("./controller");
const router = express.Router();
router.get("/donations", isAuth, myDonations);
router.post("/donations", isAuth, donated);
module.exports = router;
