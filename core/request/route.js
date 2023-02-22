const express = require("express");
const {
  createRequest,
  getRequest,
  requestByMe,
  getLatestRequest,
} = require("./controller");
const { isAuth } = require("../../middlewares/auth.middleware");
const router = express.Router();
router.get("/requests", getRequest);
router.post("/requests", isAuth, createRequest);
router.get("/requests/latest", isAuth, getLatestRequest);
router.post("/requests/me", isAuth, requestByMe);
router.get("/requests/accept:/:requestId")
module.exports = router;
