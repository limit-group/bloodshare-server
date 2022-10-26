const express = require("express");
const {
  createFacility,
  getFacility,
  updateFacility,
  deleteFacility,
  verifyFacility,
} = require("../controllers/facility.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const router = express.Router();
router.post("", isAuth, createFacility);
router.post("/verify", isAuth, verifyFacility);
router.get("/:id", isAuth, getFacility);
router.post("/:id", isAuth, updateFacility);
router.delete("/:id", isAuth, deleteFacility);
module.exports = router;
