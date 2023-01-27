const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
const { getFeed, createFeed, feedsByMe } = require("./controller");
const router = express.Router();
router.get("/feeds", isAuth, getFeed);
router.post("/feeds", isAuth, createFeed);
router.get("/feeds/me", isAuth, feedsByMe)
module.exports = router;
