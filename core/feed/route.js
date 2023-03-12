const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
const {
  getFeeds,
  createFeed,
  feedsByMe,
  attendDrive,
} = require("./controller");
const router = express.Router();
const DIR = "./public/images";
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

//multer instance to handle file storage location and filename
const upload = multer({
  storage: multer.diskStorage({
    destination: DIR,
    filename: (req, file, cb) => {
      cb(null, uuidv4());
    },
  }),
});
router.get("/feeds", isAuth, getFeeds);
router.post("/feeds", isAuth, upload.single("media"), createFeed);
router.get("/feeds/me", isAuth, feedsByMe);
router.get("/feeds/going/:feedID", isAuth, attendDrive);
module.exports = router;
