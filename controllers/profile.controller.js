const { uploadImage } = require("../services/media.service");
const prisma = require("../utils/db.utils");

// user profile -- can be used for both facility an normal user.
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

// works for -- normal user.
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

// works -- can be updated.
exports.updateUserProfile = async (req, res) => {
  const user = req.user;
  const {
    name,
    dateOfBirth,
    bloodType,
    avatar,
    email,
    streetName,
    city,
    country,
    streetNumber,
  } = req.body;
  const newAvatar = uploadImage(avatar);
  if (!newAvatar) {
    res.status(500).send({
      message: "Profile Image is Important",
    });
  }
  const profile = await prisma.userProfile.update({
    where: {
      userId: user.id,
    },
    data: {
      name: name,
      email: email,
      avatar: newAvatar,
      dateOfBirth: dateOfBirth,
      bloodType: bloodType,
      streetName: streetName,
      streetNumber: streetNumber,
      city: city,
      country: country,
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
// ------------------------ Facility Profile --------------------------------------
exports.createFacility = async (req, res) => {
  const user = req.user;
  const {
    name,
    mission,
    streetName,
    streetNumber,
    license,
    city,
    country,
    licenseNumber,
  } = req.body;

  const newLicense = uploadImage(license);
  const facility = await prisma.facility.update({
    where: {
      email: user.email,
    },
    data: {
      name: name,
      mission: mission,
      streetName: streetName,
      streetNumber: streetNumber,
      city: city,
      license: newLicense,
      country: country,
      licenseNumber: licenseNumber,
    },
  });
  if (!facility) {
    res.status(500).send({
      message: "could not create facility profile",
    });
  } else {
    res.status(201).send({
      message: "Facility Information Loaded."
    });
  }
};

// We will have to verify manually.
exports.verifyFacility = async (req, res) => {
  const user = req.user;
  const { licenseImage } = req.licenseImage;
  if (user.role !== "FACILITYADMIN") {
    res.status(403).json({
      message: "forbidden action!",
    });
  } else {
    img = uploadImage(licenseImage);
    const profile = await prisma.facility.update({
      where: {
        facilityId: parseInt(req.params.id),
      },
      data: {
        license: img,
        verified: true,
      },
    });
    if (!profile) {
      res.status(500).json({
        message: "an unexpected error occurred!",
      });
    } else {
      res.status(200).send(profile);
    }
  }
};


exports.getFacility = async (req, res) => {
  const profile = await prisma.facility.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!profile) {
    res.status(404).send({
      message: "facility profile unavailable!",
    });
  } else {
    res.status(200).send(profile);
  }
};

exports.deleteFacility = async (req, res) => {
  const user = req.user
  if(user.role != "SUPERADMIN") {
    return res.send({
      message: "This action is out of reach, Haha."
    })
  }

  try {
    await prisma.facility.delete({
      where: {
        facilityId: parseInt(req.params.id),
      },
    });
    res.send(200).send({
      message: "facility has been deleted!",
    });
  } catch (err) {
    console.log(err);
    res.send({
      message: "facility could not be deleted at this time try again later!",
    });
  }
  
};
