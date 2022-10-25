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

router.get("/user-profile/", isAuth, getUserProfile);
router.post("/create-user-profile", isAuth, addUserProfile);
router.post("/update-user-profile", isAuth, updateUserProfile);
router.delete("/delete-user-profile", isAuth, deleteUserProfile);
router.post("/create-facility-profile", isAuth, addFacilityProfile);
router.get("/facility-profile/:facilityId", isAuth, getFacilityProfile);
router.post(
  "/update-facility-profile/:facilityId",
  isAuth,
  updateFacilityProfile
);
router.delete(
  "/delete-facility-profile/:facilityId",
  isAuth,
  deleteFacilityProfile
);

module.exports = router;
