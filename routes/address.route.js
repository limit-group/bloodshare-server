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

router.get("/facility-address", isAuth, getFacilityAddress);
router.get("/user-address", isAuth, getUserAddress);
router.post("/create-user-address", isAuth, addUserAddress);
router.post("/create-facility-address", isAuth, addFacilityAddress);
router.post("/update-user-address", isAuth, updateUserAddress);
router.post("update-facility-address", isAuth, updateFacilityAddress);

module.exports = router;
