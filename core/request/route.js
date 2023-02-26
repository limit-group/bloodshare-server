const express = require("express");
const {
  createRequest,
  getRequest,
  requestByMe,
  getLatestRequest,
  acceptBroadcast,
} = require("./controller");
const { isAuth } = require("../../middlewares/auth.middleware");
const router = express.Router();
router.get("/requests", isAuth, getRequest);
router.post("/requests", isAuth, createRequest);
router.get("/requests/latest", isAuth, getLatestRequest);
router.get("/requests/me", isAuth, requestByMe);
router.get("/requests/accept:/:requestId", acceptBroadcast)
module.exports = router;
