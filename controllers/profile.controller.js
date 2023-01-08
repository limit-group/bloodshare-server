const { uploadImage } = require("../services/media.service");
const prisma = require("../utils/db.utils");

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
      image: image_url,
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
  const { name, dateOfBirth, bloodType, avatar } = req.body;
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
