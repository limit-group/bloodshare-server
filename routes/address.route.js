const express = require("express");
const {
  getFacilityAddress,
  getUserAddress,
  updateUserAddress,
  updateFacilityAddress,
  addUserAddress,
  addFacilityAddress,
} = require("../controllers/address.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/facility", isAuth, getFacilityAddress);
router.get("/user", isAuth, getUserAddress);
router.post("/user", isAuth, addUserAddress);
router.post("/facility", isAuth, addFacilityAddress);
router.post("/updateUser", isAuth, updateUserAddress);
router.post("updateFacility/:facilityId", isAuth, updateFacilityAddress);

module.exports = router;
