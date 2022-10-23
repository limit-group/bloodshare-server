const express = require("express");
const {
  getFacilityProfile,
  getUserProfile,
  addUserProfile,
  addFacilityProfile,
  updateUserProfile,
  updateFacilityProfile,
} = require("../controllers/profile.controller");
const router = express.Router();

router.get("/facility-profile", getFacilityProfile);
router.get("/user-profile", getUserProfile);
router.post("/create-user-profile", addUserProfile);
router.post("/create-facility-profile", addFacilityProfile);
router.post("/update-user-profile", updateUserProfile);
router.post("/update-facility-profile", updateFacilityProfile);

module.exports = router;
