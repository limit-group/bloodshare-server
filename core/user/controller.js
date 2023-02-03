const prisma = require("../../utils/db.utils");
const bcrypt = require("bcryptjs");
const { jwtSign } = require("../../middlewares/auth.middleware");
const { generateOTP } = require("../../services/otp.service");
const { sendSMS } = require("../../services/message.service");

// EPI
exports.endpoint = (req, res) => {
  res.json({
    message: "Endpoint is up!",
  });
};

// validate otp sent via sms.
const validatePhoneOtp = async (id, otp) => {
  // check user
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) {
    return [false, "user doesn't exist"];
  }
  if (user && user.otp !== otp) {
    return [false, "invalid otp provided"];
  }
  const newUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      verified: true,
    },
  });
  return [true, newUser];
};

// generated password
const generatePassword = (password) => {
  encrypted = bcrypt.hashSync(password, 10);
  return encrypted;
};

// user signup by mobile number
exports.mobileSignup = async (req, res) => {
  const { password, phone } = req.body;
  const otp = generateOTP();
  // check if account exists
  const user = await prisma.user.findUnique({
    where: {
      phoneNumber: phone,
    },
  });
  if (user) {
    return res
      .status(400)
      .send({ message: "User with this phone number exists!" });
  }
  // create new user
  const new_user = await prisma.user.create({
    data: {
      phoneNumber: phone,
      password: generatePassword(password),
      otp: otp,
    },
  });
  if (!new_user) {
    return res.status(500).send("Unable to signup, please try again later!");
  }
  // send otp message.
  const info = await sendSMS({
    to: phone,
    message: `Enter this code ${otp} to verify your account . Thank you.`,
  });

  if (!info) {
    return res.status(500).send("Unable to signup, please try again later!");
  }
  res.status(200).send(user);
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
      .json({ message: "user with this phone number doesn't exist" });
  }
  if (user && bcrypt.compareSync(password, user.password)) {
    return res.status(200).send({
      token: jwtSign(user),
      message: "authentication success",
    });
  } else {
    return res.status(401).send("Wrong Password provided.");
  }
};

// phone number verification
exports.verifyPhone = async (req, res) => {
  const u = req.user;
  const { otp } = req.body;
  const user = await validatePhoneOtp(u.id, otp);
  if (!user) {
    res.status(500).send("email verification failed");
  }
  res.status(200).send("user verification success");
};

// password change - Can be used for both phone and email
exports.updatePassword = async (req, res) => {
  encrypted = generatePassword(req.body.password);
  const user = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: {
      password: encrypted,
    },
  });

  if (!user) {
    res.status(500).send("password update failure");
  }
  res.status(200).send("password change successful");
};

// user profile -- can be used for both facility an normal user.
exports.getUserProfile = async (req, res) => {
  const user = req.user;
  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (!profile) {
    return res.status(404).send({
      message: "profile requested not found!",
    });
  }
  return res.status(200).send(profile);
};

// works for -- normal user.
exports.addUserProfile = async (req, res) => {
  const user = req.user;
  const { name, dateOfBirth, bloodType, image, latitude, longitude } = req.body;
  const image_url = await uploadImage(image);
  if (!image_url) {
    return res.status(500).send("Retry the image upload.");
  }

  const profile = await prisma.profile.create({
    data: {
      userId: user.id,
      name: name,
      dateOfBirth: dateOfBirth,
      bloodType: bloodType,
      avatar: image_url,
      latitude: latitude,
      longitude: longitude,
    },
  });
  if (!profile) {
    return res.status(500).send({
      message: "user profile creation failure",
      error: error,
    });
  } else {
    return res.status(201).send({
      message: "profile created Success",
      profile: profile,
    });
  }
};

// works -- can be updated.
exports.updateUserProfile = async (req, res) => {
  const user = req.user;
  const { name, dateOfBirth, bloodType, avatar, latitude, longitude } =
    req.body;
  const newAvatar = uploadImage(avatar);
  if (!newAvatar) {
    return res.status(500).send({
      message: "Profile Image is Important",
    });
  }
  const profile = await prisma.userProfile.update({
    where: {
      userId: user.id,
    },
    data: {
      name: name,
      avatar: newAvatar,
      dateOfBirth: dateOfBirth,
      bloodType: bloodType,
      latitude: latitude,
      longitude: longitude,
    },
  });
  if (!profile) {
    return res.status(500).send({
      message: "user profile failure",
      error: error,
    });
  } else {
    return res.status(200).send(profile);
  }
};

// // user signup by email -only for facility
// exports.signup = async (req, res) => {
//   const { email, password, name } = req.body;
//   const otp = generateOTP();
//   const checkUser = await prisma.facility.findUnique({
//     where: {
//       email: email,
//     },
//   });

//   if (checkUser) {
//     return res.send("user with this email exists");
//   }

//   encrypted = generatePassword(password);
//   const user = await prisma.facility.create({
//     data: {
//       email: email.toLowerCase(),
//       role: "FACILITYADMIN",
//       phone: "",
//       name: name,
//       password: encrypted,
//       otp: otp,
//     },
//   });
//   if (!user) {
//     return res.status(500).send({
//       message: "unable to signup, please try again later",
//       error: error,
//     });
//   } else {
//     try {
//       await sendMail({
//         to: email,
//         otp: otp,
//       });
//       const token = jwtSign(user);
//       // console.log(token);
//       res.status(200).json({ token: token });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({
//         message: "unable to signup, please try again later",
//       });
//     }
//   }
// };

// // user creation with role in facility
// exports.createUser = async (req, res) => {
//   const { email, password } = req.body;
//   const otp = generateOTP();
//   const user = await prisma.facility.findUnique({
//     where: {
//       email: email,
//     },
//   });
//   if (user) {
//     return res.send("user with this email exists");
//   } else {
//     encrypted = generatePassword(password);
//     const user = new prisma.user.create({
//       data: {
//         email: email.toLowerCase(),
//         password: encrypted,
//         role: "FACILITYUSER",
//         otp: otp,
//       },
//     });

//     if (!user) {
//       return res.status(500).send({
//         message: "unable to create user, please try again later",
//       });
//     } else {
//       try {
//         await sendMail({
//           to: email,
//           otp: otp,
//         });
//         res.status(200).send({
//           message: "user account creation success",
//           user: user,
//         });
//       } catch (error) {
//         return [
//           false,
//           "unable to create account, please try again later",
//           error,
//         ];
//       }
//     }
//   }
// };

// // validate
// const validateEmailOtp = async (email, otp) => {
//   const user = await prisma.facility.findUnique({
//     where: {
//       email: email,
//     },
//   });
//   if (!user) {
//     return [false, "user doesn't exist"];
//   }

//   if (user && user.otp !== otp) {
//     return [false, "invalid otp provided"];
//   }
//   const newUser = await prisma.user.update({
//     where: {
//       id: user.id,
//     },
//     data: {
//       verified: true,
//     },
//   });
//   return [true, newUser];
// };

// // email verification works
// exports.verifyMail = async (req, res) => {
//   const facility = req.user;
//   console.log(facility);
//   const { otp } = req.body;
//   const user = await validateEmailOtp(facility.email, otp);
//   if (!user) {
//     return res.status(500).send({
//       message: "Email verification failed!",
//       error: error,
//     });
//   }
//   console.log(user);
//   res.status(200).send({
//     message: "user verification success",
//   });
// };

// // user login works
// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   // console.log(req.body);
//   const checkUser = await prisma.facility.findUnique({
//     where: {
//       email: email,
//     },
//   });
//   console.log(checkUser);
//   if (!checkUser) {
//     return res.status(404).json({
//       message: "user with this email doesn't exist",
//     });
//   }

//   if (user && bcrypt.compareSync(password, user.password)) {
//     const token = jwtSign(user);
//     res.send({
//       token: token,
//       user: user,
//       message: "authentication success",
//     });
//   } else {
//     res.status(401).send({
//       message: "Password doesn't match.",
//     });
//   }
// };
