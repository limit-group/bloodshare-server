const prisma = require("../utils/db.utils");
const bcrypt = require("bcryptjs");
const { jwtSign } = require("../middlewares/auth.middleware");
const { generateOTP } = require("../services/otp.service");
const { sendMail } = require("../services/email.service");
const { sendMessage } = require("../services/message.service");

// check email exists
const checkMail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return false;
  }
  return user;
};

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
  const exists = checkPhone(phone);

  if (!exists) {
    res.send("user with this phone exists");
  } else {
    encrypted = generatePassword(password);
    const user = await prisma.user.create({
      data: {
        phone: phone,
        password: encrypted,
        otp: otp,
      },
    });
    try {
      await sendMessage({
        to: phone,
        message: `enter this code  ${otp} to verify your account . Thank you`,
      });
      res.status(200).send({
        message: "account creation success",
      });
    } catch (error) {
      return [false, "unable to signup, please try again later", error];
    }
    return jwtSign(user);
  }
};

// user signup by email
exports.signup = async (req, res) => {
  const { email, password, name, phone } = req.body;
  const otp = generateOTP();
  const exists = checkMail(email);
  if (exists) {
    res.send("user with this email exists");
  } else {
    encrypted = generatePassword(password);
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name: name,
        phone: phone,
        password: encrypted,
        otp: otp,
      },
    });
    try {
      await sendMail({
        to: email,
        otp: otp,
      });
      res.status(200).send({
        message: "account creation success",
      });
    } catch (error) {
      return [false, "unable to signup, please try again later", error];
    }
    return jwtSign(user);
  }
};

// facility registration
exports.register = async (req, res) => {
  const { email, password } = req.body;
  const otp = generateOTP();
  const exists = checkMail(email);
  if (exists) {
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
    try {
      await sendMail({
        to: email,
        otp: otp,
      });
    } catch (error) {
      return [false, "unable to signup, please try again later", error];
    }
    return jwtSign(user);
  }
};

// user creation with role in facility
exports.createUser = async (req, res) => {
  const { email, password, facility } = req.body;
  const otp = generateOTP();
  const exists = checkMail(email);
  if (exists) {
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

    try {
      await sendMail({
        to: email,
        otp: otp,
      });
    } catch (error) {
      return [false, "unable to create account, please try again later", error];
    }
    res.status(200).send({
      message: "user account creation success",
      user: user,
    });
  }
};

// email verification works
exports.verifyMail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await validateOTP(email, otp);
  res.status(200).send({
    message: "user verification success",
    user: user,
  });
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
  const { email, password, newPassword } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    res.send("email address not valid");
  }
  if (user && bcrypt.compareSync(password, user.password)) {
    encrypted = generatePassword(password);
    const user = new prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: encrypted,
      },
    });
  } else {
    res.status(400).send({
      message: "password provided is invalid",
    });
  }
};

exports.endpoint = (req, res) => {
  res.json({
    message: "Endpoint is up!",
  });
};
