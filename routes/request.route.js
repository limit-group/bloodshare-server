const express = require("express");
const {
  getRequest,
  createRequest,
  getLatestRequest,
  requestByMe,
  acceptBroadcast,
} = require("../controllers/request.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const router = express.Router();
router.get("/requests", isAuth, getRequest);
router.post("/requests", isAuth, createRequest);
router.get("/requests/latest", isAuth, getLatestRequest);
router.get("/requests/me", isAuth, requestByMe);
router.get("/requests/accept/:requestId", isAuth, acceptBroadcast);
module.exports = router;
