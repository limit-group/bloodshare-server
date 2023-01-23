const express = require("express");
const {
  getEmergencyFeed,
  emergencyFeed,
} = require("../controllers/request.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const router = express.Router();
router.get("/requests",  getEmergencyFeed);
router.post("/requests", isAuth, emergencyFeed);
module.exports = router;
