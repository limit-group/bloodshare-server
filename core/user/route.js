const express = require("express");
const { isAuth } = require("../../middlewares/auth.middleware");
const {
  mobileLogin,
  mobileSignup,
  verifyPhone,
  updatePassword,
  getUserProfile,
  addUserProfile,
  updateUserProfile,
  forgotPassword,
  endpoint,
  resendOTP,
  getUsers,
  createUser,
  addFacilityProfile,
  getFacilityProfile,
} = require("./controller");
const router = express.Router();
const DIR = "./public/avatars";
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

//multer instance to handle file storage location and filename
const upload = multer({
  storage: multer.diskStorage({
    destination: DIR,
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  }),
});

router.get("", endpoint);
router.post("/login", mobileLogin);
router.post("/signup", mobileSignup);
router.post("/verify", verifyPhone);
router.post("/forgot", forgotPassword);
router.post("/resend", resendOTP);
router.get("/users", isAuth, getUsers);
router.post("/users", isAuth, createUser);
router.post("/password", isAuth, updatePassword);
router.get("/profiles", isAuth, getUserProfile);
router.post("/profiles", isAuth, upload.single("image"), addUserProfile);
router.get("/facility", isAuth, getFacilityProfile);
router.post("/facility", upload.single("license"), addFacilityProfile);
router.post("/profiles/update", isAuth, updateUserProfile);
module.exports = router;
