const prisma = require("../utils/db.utils");
const bcrypt = require("bcryptjs");
const { jwtSign } = require("../middlewares/auth.middleware");
const { generateOTP } = require("../services/otp.services");
const { sendMail } = require("../services/email.service");

const checkMail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};

const validateOTP = async (email, otp) => {
  const user = checkMail(email);
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

// user signup
exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const otp = generateOTP();
  const user = checkMail(email);
  if (user) {
    res.send("user with this email exists");
  } else {
    encrypted = bcrypt.hash(password, 12);
    const user = new prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: encrypted,
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

// facility registration
exports.register = async (req, res) => {
  const { email, password } = req.body;
  const otp = generateOTP();
  const user = checkMail(email);
  if (!user) {
    res.send("user with this email exists");
  } else {
    encrypted = bcrypt.hash(password, 12);
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
  const user = await checkMail(email);
  if (!user) {
    res.send("user with this email exists");
  } else {
    encrypted = bcrypt.hash(password, 12);
    const user = new prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: encrypted,
        role: "FACILITYUSER",
        facility: facility,
      },
    });
    return jwtSign(user);
  }
};

// email verification
exports.verifyMail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await validateOTP(email, otp);
  res.send(user);
};

// user login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = checkMail(email);
  if (!user) {
    res.json({
      message: "user with this email doesn't exist",
    });
  } else {
    if (user && bcrypt.compareSync(password, user.password)) {
      return jwtSign(user);
    }
  }
};

// password change
exports.updatePassword = async (req, res) => {
  const { email, password, newPassword } = req.body;
  const user = checkMail(email);
  if (!user) {
    res.send("email address not valid");
  } else {
    if (user && bcrypt.compareSync(password, user.password)) {
      encrypted = bcrypt.hash(password, 12);
      const user = new prisma.user.update({
        where: {
          email: email,
        },
        data: {
          email: email.toLowerCase(),
          password: encrypted,
          facility: facility,
        },
      });
    } else {
      res.status(400).send({
        message: "password provided is invalid",
      });
    }
  }
};

exports.endpoint = (req, res) => {
  res.json({
    message: "Endpoint is up!",
  });
};
