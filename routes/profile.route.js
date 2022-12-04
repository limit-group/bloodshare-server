const express = require("express");
const {
  getUserProfile,
  addUserProfile,
  updateUserProfile,
  deleteUserProfile,
  createFacility,
  verifyFacility,
  getFacility,
  deleteFacility,
} = require("../controllers/profile.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const router = express.Router();
router.get("/user", isAuth, getUserProfile);
router.post("/user", isAuth, addUserProfile);
router.post("/update", isAuth, updateUserProfile);
router.delete("/delete", isAuth, deleteUserProfile);
// Facility---------------------
router.post("", isAuth, createFacility);
router.post("/verify", isAuth, verifyFacility);
router.get("/:id", isAuth, getFacility);
router.delete("/:id", isAuth, deleteFacility);
module.exports = router;
