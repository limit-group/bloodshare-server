const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
const { getFeeds, createFeed, feedsByMe } = require("./controller");
const router = express.Router();
router.get("/feeds", getFeeds);
router.post("/feeds", isAuth, createFeed);
router.get("/feeds/me", isAuth, feedsByMe)
module.exports = router;
