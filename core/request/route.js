const express = require("express");
const { createRequest, getRequest, requestByMe } = require("./controller");
const { isAuth } = require("../../middlewares/auth.middleware");
const router = express.Router();
router.get("/requests", getRequest);
router.post("/requests", isAuth, createRequest);
router.post("/requests/me", isAuth, requestByMe);
module.exports = router;
