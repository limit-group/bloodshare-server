const prisma = require("../utils/db.utils");
// user profile-works
exports.getUserProfile = async (req, res) => {
  const user = req.user;
  const profile = await prisma.userProfile.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (!profile) {
    res.status(404).send({
      message: "profile requested not found!",
    });
  } else {
    res.status(200).send(profile);
  }
};
// works
exports.addUserProfile = async (req, res) => {
  const user = req.user;
  const { name, dateOfBirth, bloodType } = req.body;
  const profile = await prisma.userProfile.create({
    data: {
      userId: user.id,
      name: name,
      dateOfBirth: dateOfBirth,
      bloodType: bloodType,
    },
  });
  if (!profile) {
    res.status(500).send({
      message: "user profile failure",
      error: error,
    });
  } else {
    res.status(201).send({
      message: "profile created",
      profile: profile,
    });
  }
};
// works
exports.updateUserProfile = async (req, res) => {
  const user = req.user;
  const { name, dateOfBirth, bloodType } = req.body;
  const profile = await prisma.userProfile.update({
    where: {
      userId: user.id,
    },
    data: {
      name: name,
      dateOfBirth: dateOfBirth,
      bloodType: bloodType,
    },
  });
  if (!profile) {
    res.status(500).send({
      message: "user profile failure",
      error: error,
    });
  } else {
    res.status(200).send(profile);
  }
};
// untested
exports.deleteUserProfile = async (req, res) => {
  const user = req.user;
  try {
    await prisma.userProfile.delete({
      where: {
        userId: user.id,
      },
    });
    res.send(200).send({
      message: "profile has been deleted",
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: "profile could not be deleted at this time try again later",
    });
  }
};
