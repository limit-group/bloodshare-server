const prisma = require("../utils/db.utils");
const bcrypt = require("bcryptjs");
const { jwtSign } = require("../middlewares/auth.middleware");
const { generateOTP } = require("../services/otp.service");
const { sendMail } = require("../services/email.service");
const { sendMessage } = require("../services/message.service");

// check phone exists
const checkPhone = async (phone) => {
  const user = await prisma.user.findUnique({
    where: {
      phone: phone,
    },
  });

  console.log(user);

  if (!user) {
    return false;
  }
  return user;
};
// validate otp
const validateOTP = async (email, otp) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log(otp);
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

const generatePassword = (password) => {
  encrypted = bcrypt.hashSync(password, 10);
  return encrypted;
};

// user signup by mobile number
exports.mobileSignup = async (req, res) => {
  const { password, phone } = req.body;
  const otp = generateOTP();
  const user = await prisma.user.findUnique({
    where: {
      phone: phone,
    },
  });
  if (user) {
    res.send("user with this phone number exists");
  } else {
    encrypted = generatePassword(password);
    const user = await prisma.user.create({
      data: {
        phone: phone,
        password: encrypted,
        otp: otp,
      },
    });
    if (!user) {
      res.status(500).send({
        message: "unable to signup, please try again later",
        error: error,
      });
    } else {
      try {
        await sendMessage({
          to: phone,
          message: `enter this code  ${otp} to verify your account . Thank you`,
        });
        res.status(200).json({
          user: jwtSign(user),
        });
      } catch (error) {
        res.status(500).send({
          message: "unable to signup, please try again later",
          error: error,
        });
      }
    }
  }
};

// user signup by email
exports.signup = async (req, res) => {
  const { email, password, phone } = req.body;
  const otp = generateOTP();
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    res.send("user with this email exists");
  } else {
    encrypted = generatePassword(password);
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        phone: phone,
        password: encrypted,
        otp: otp,
      },
    });
    if (!user) {
      res.status(500).send({
        message: "unable to signup, please try again later",
        error: error,
      });
    } else {
      try {
        await sendMail({
          to: email,
          otp: otp,
        });
        res.status(200).json({ token: jwtSign(user) });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "unable to signup, please try again later",
        });
      }
    }
  }
};

// facility registration
exports.register = async (req, res) => {
  const { email, password } = req.body;
  const otp = generateOTP();
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    res.send("user with this email exists");
  } else {
    encrypted = generatePassword(password);
    const user = new prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: encrypted,
        role: "FACILITYADMIN",
        otp: otp,
      },
    });

    if (!user) {
      try {
        await sendMail({
          to: email,
          otp: otp,
        });
      } catch (error) {
        res.status(500).send({
          message: "unable to signup, please try again later",
        });
      }
      return jwtSign(user);
    }
  }
};

// user creation with role in facility
exports.createUser = async (req, res) => {
  const { email, password, facility } = req.body;
  const otp = generateOTP();
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    res.send("user with this email exists");
  } else {
    encrypted = generatePassword(password);
    const user = new prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: encrypted,
        role: "FACILITYUSER",
        otp: otp,
      },
    });

    if (!user) {
      res.status(500).send({
        message: "unable to create user, please try again later",
      });
    } else {
      try {
        await sendMail({
          to: email,
          otp: otp,
        });
        res.status(200).send({
          message: "user account creation success",
          user: user,
        });
      } catch (error) {
        return [
          false,
          "unable to create account, please try again later",
          error,
        ];
      }
    }
  }
};

// email verification works
exports.verifyMail = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await validateOTP(email, otp);
    res.status(200).send({
      message: "user verification success",
      user: user,
    });
  } catch (error) {
    res.status(500).send({
      message: "email verification failed",
      error: error,
    });
  }
};

// phone number verification
exports.verifyPhone = async (req, res) => {
  const { phone, otp } = req.body;
  try {
    const user = await validateOTP(email, otp);
    res.status(200).send({
      message: "user verification success",
      user: user,
    });
  } catch (error) {
    res.status(500).send({
      message: "email verification failed",
      error: error,
    });
  }
};

// user login works
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    res.json({
      message: "user with this email doesn't exist",
    });
  }
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwtSign(user);
    res.send({
      token: token,
      role: user.role,
      message: "authentication success",
    });
  }
};

// user login works
exports.mobileLogin = async (req, res) => {
  const { phone, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      phone: phone,
    },
  });
  if (!user) {
    res.json({
      message: "user with this phone number doesn't exist",
    });
  }
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwtSign(user);
    res.send({
      token: token,
      role: user.role,
      message: "authentication success",
    });
  }
};

// password change
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
    res.status(500).send({
      message: "password update failure",
      error: error,
    });
  } else {
    res.status(200).send({
      message: "password change successful",
      user: user,
    });
  }
};

exports.endpoint = (req, res) => {
  res.json({
    message: "Endpoint is up!",
  });
};
