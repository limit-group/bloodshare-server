const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
const {
  getFeeds,
  createFeed,
  feedsByMe,
  attendDrive,
} = require("./controller");
const router = express.Router();
router.get("/feeds", isAuth, getFeeds);
router.post("/feeds", isAuth, createFeed);
router.get("/feeds/me", isAuth, feedsByMe);
router.get("/feeds/going/:feedID", attendDrive);
module.exports = router;
