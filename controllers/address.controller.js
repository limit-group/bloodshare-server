const prisma = require("../utils/db.utils");
exports.getUserAddress = async (req, res) => {
  const user = req.user;
  try {
    const profile = await prisma.userProfile.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (!profile) {
      return res.status(500).send({
        message: "could not get user address!",
      });
    } else {
      const address = {
        name: profile.name,
        streetName: profile.streetName,
        streetNumber: profile.streetNumber,
        city: profile.city,
        country: profile.country,
      };
      return res.status(200).send(address);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "failed to retrieve address, retry",
    });
  }
};
exports.getFacilityAddress = async (req, res) => {
  try {
    const profile = await prisma.facility.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    console.log(profile);
    const address = {
      name: profile.name,
      streetName: profile.streetName,
      streetNumber: profile.streetNumber,
      city: profile.city,
      country: profile.country,
    };
    if (!profile) {
      return res.status(500).send({
        message: "could not get facility address!",
      });
    } else {
      return res.status(200).send(address);
    }
  } catch (error) {
    res.status(400).send({
      message: "failed to retrieve address, retry",
    });
  }
};
