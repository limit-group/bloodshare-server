const prisma = require("../utils/db.utils");
const bcrypt = require("bcryptjs");
const { jwtSign } = require("../middlewares/auth.middleware");
const { generateOTP } = require("../services/otp.service");
const { sendSMS } = require("../services/message.service");

// EPI
exports.endpoint = (req, res) => {
  res.json({
    message: "Endpoint is up!",
  });
};

// generated password
const generatePassword = (password) => {
  encrypted = bcrypt.hashSync(password, 10);
  return encrypted;
};

// user signup by mobile number
exports.mobileSignup = async (req, res) => {
  const { password, phone, role } = req.body;
  const otp = generateOTP();
  // check if account exists
  const user = await prisma.user.findUnique({
    where: {
      phoneNumber: phone,
    },
  });
  if (!user) {
    // create new user
    const new_user = await prisma.user.create({
      data: {
        phoneNumber: phone,
        password: generatePassword(password),
        otp: otp,
        role: role,
      },
    });
    if (!new_user) {
      return res
        .status(500)
        .send({ message: "Unable to signup, please try again later!" });
    }
    // send otp message.
    await sendSMS({
      to: phone,
      message: `Enter this code ${otp} to verify your account . Thank you.`,
    });
    res.status(201).send({
      message: "User Created.",
    });
  } else {
    return res
      .status(500)
      .send({ message: "User with this phone number exists!" });
  }
};

// user login works
exports.mobileLogin = async (req, res) => {
  const { phone, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      phoneNumber: phone,
    },
  });
  if (!user) {
    return res
      .status(400)
      .json({ message: "user with this mobile doesn't exist" });
  }
  if (user && bcrypt.compareSync(password, user.password)) {
    return res.status(200).send({
      token: jwtSign(user),
      role: user.role,
      message: "authentication success",
    });
  } else {
    return res.status(401).send({ message: "Wrong Password provided." });
  }
};

exports.verifyPhone = async (req, res) => {
  const { code, phone } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        phoneNumber: phone,
      },
    });
    // validate otp sent via sms.
    if (user && user.otp == code) {
      try {
        await prisma.user.update({
          where: {
            phoneNumber: phone,
          },
          data: {
            verified: true,
          },
        });
        res.status(200).send({ message: "User verification success" });
      } catch (err) {
        console.log(err);
        res.status(500).send({ message: "An Error occurred, Retry!" });
      }
    } else {
      res.status(500).send({ message: "An Invalid Code supplied!" });
    }
  } catch (err) {
    res.status(500).send({ message: "Phone verification failed!" });
  }
};

// password change - Can be used for both phone and email
exports.updatePassword = async (req, res) => {
  try {
    encrypted = generatePassword(req.body.password);
    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        password: encrypted,
      },
    });
    res.status(200).send({ message: "password change successful" });
  } catch (err) {
    res.status(500).send({ message: "password update failure" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    await prisma.user.findUnique({
      where: {
        phoneNumber: req.body.phone,
      },
    });
    res.status(200).send({ message: "User Found." });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "User with this phone number not found!" });
  }
};

exports.resendOTP = async (req, res) => {
  const otp = generateOTP();
  await sendSMS({
    to: req.body.phone,
    message: `Enter this code ${otp} to recover your account .Thank you.`,
  });
  try {
    await prisma.user.update({
      where: {
        phoneNumber: phone,
      },
      data: {
        otp: otp,
      },
    });
    res.status(200).send({ message: "Check SMS for OTP code." });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "User with this phone number not found!" });
  }
};

// user profile -- can be used for both facility an normal user.
exports.getUserProfile = async (req, res) => {
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).send(profile);
  } catch (err) {
    return res.status(404).send({
      message: "profile requested not found!",
    });
  }
};

// works for -- normal user.
exports.addUserProfile = async (req, res) => {
  const {
    fullName,
    dob,
    bloodType,
    latitude,
    longitude,
    bodyWeight,
    email,
    gender,
  } = req.body;
  const image_url = req.file.filename;
  if (!image_url) {
    return res.status(500).send({ message: "failed to upload your avatar." });
  }

  try {
    await prisma.profile.create({
      data: {
        userId: req.user.id,
        name: fullName,
        bloodType: bloodType,
        gender: gender,
        avatar: image_url,
        email: email,
        bodyWeight: bodyWeight,
        dateOfBirth: dob,
        // latitude: latitude.toString(),
        // longitude: longitude.toString(),
      },
    });
    res.status(201).send({
      message: "profile created Success",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "user profile creation failure",
    });
  }
};

// works -- can be updated.
exports.updateUserProfile = async (req, res) => {
  const { fullName, image, email, dob } = req.body;
  try {
    await prisma.profile.update({
      where: {
        userId: req.user.id,
      },
      data: {
        name: fullName,
        email: email,
        dateOfBirth: dob,
      },
    });
    res.status(200).send({ message: "profile updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "user profile failure",
    });
  }
};

// get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("failed to get users");
  }
};

exports.createUser = async (req, res) => {
  const { phone, role, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      phoneNumber: phone,
    },
  });
  if (user) {
    return res.send("user with this phone number exists");
  } else {
    encrypted = generatePassword(password);
    const user = new prisma.user.create({
      data: {
        phoneNumber: phone,
        password: encrypted,
        role: role,
      },
    });

    if (!user) {
      return res.status(500).send({
        message: "unable to create user, please try again later",
      });
    } else {
      try {
        res.status(200).send({
          message: "user account creation success",
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "unable to create account, please try again later",
        });
      }
    }
  }
};

// facility profile
exports.addFacilityProfile = async (req, res) => {
  const {
    phone,
    fname,
    email,
    latitude,
    longitude,
    city,
    country,
    mission,
    licenseNumber,
  } = req.body;
  try {
    const facility = await prisma.facility.create({
      data: {
        name: fname,
        email: email,
        latitude: latitude,
        longitude: longitude,
        city: city,
        country: country,
        mission: mission,
        license: req.file.filename,
        licenseNumber: licenseNumber,
      },
    });
    await prisma.user.update({
      where: {
        phoneNumber: phone,
      },
      data: {
        facilityId: facility.id,
      },
    });

    res.status(201).send({
      message: "facility added success",
    });
  } catch (err) {
    res.status(500).send({
      message: "failed to add Facility profile",
    });
  }
};

exports.getFacilityProfile = async (req, res) => {
  try {
    const facility = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });
    const profile = await prisma.facility.findFirst({
      where: {
        id: facility.facilityId,
      },
    });
    res.status(200).send(profile);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "failed to fetch facility profile!",
    });
  }
};
