const prisma = require("../utils/db.utils");

// facility profile...

exports.getFacilityProfile = async (req, res) => {
  const profile = await prisma.facilityProfile.findFirst({
    where: {
      facilityId: req.facilityId,
    },
  });
  if (!profile) {
    res.status(404).send({
      message: "facility profile unavailable",
    });
  }
  res.status(200).send(profile);
};

exports.addFacilityProfile = async (req, res) => {
  const user = req.user;
  const { name, description } = req.body;
  try {
    const profile = await prisma.facilityProfile.create({
      data: {
        userId: user.id,
        name: name,
        description: description,
      },
    });

    res.status(200).send(
      {
        message: "profile created",
      },
      error
    );
  } catch (error) {
    console.log(error);
  }
};

exports.updateFacilityProfile = async (req, res) => {
  const { name, description } = req.body;
  const profile = await prisma.facilityProfile.update({
    where: {
      facilityId: req.facilityId,
    },
    data: {
      name: name,
      description: description,
    },
  });
  if (!profile) {
    res.status(404).send({
      message: "profile unavailable for update!",
    });
  }
  res.status(200).send(profile);
};

exports.deleteFacilityProfile = async (req, res) => {
  const user = req.user;
  try {
    await prisma.facilityProfile.delete({
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

// user profile
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
    res.status(200).send({
      message: "profile available",
      profile: profile,
    });
  }
};

exports.addUserProfile = async (req, res) => {
  const user = req.user;
  const { name, description } = req.body;
  try {
    const profile = await prisma.userProfile.create({
      data: {
        userId: user.id,
        name: name,
        description: description,
      },
    });
    console.log(profile);
    res.status(200).send(
      {
        message: "profile created",
      },
      error
    );
  } catch (error) {
    console.log(error);
  }
};

exports.updateUserProfile = async (req, res) => {
  const user = req.user;
  const { name, description } = req.body;
  try {
    const profile = await prisma.userProfile.create({
      where: {
        userId: user.id,
      },
      data: {
        name: name,
        description: description,
      },
    });
    res.status(200).send(
      {
        message: "profile created",
        profile: profile,
      },
      error
    );
  } catch (error) {
    console.log(error);
  }
};

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
