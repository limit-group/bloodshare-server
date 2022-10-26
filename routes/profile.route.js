const express = require("express");
const {
  getFacilityProfile,
  getUserProfile,
  addUserProfile,
  addFacilityProfile,
  updateUserProfile,
  updateFacilityProfile,
  deleteFacilityProfile,
  deleteUserProfile,
} = require("../controllers/profile.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const router = express.Router();
router.get("/user", isAuth, getUserProfile);
router.post("/user", isAuth, addUserProfile);
router.post("/update", isAuth, updateUserProfile);
router.delete("/delete", isAuth, deleteUserProfile);
router.post("/facility", isAuth, addFacilityProfile);
router.get("/facility/:facilityId", isAuth, getFacilityProfile);
router.post("/facility/:facilityId", isAuth, updateFacilityProfile);
router.delete("/facility/:facilityId", isAuth, deleteFacilityProfile);
module.exports = router;
