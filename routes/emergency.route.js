const express = require("express");
const {
  getEmergencyFeed,
  emergencyFeed,
} = require("../controllers/emergency.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const router = express.Router();
router.get("/e-feeds", isAuth, getEmergencyFeed);
router.post("/e-feeds", isAuth, emergencyFeed);
module.exports = router;
