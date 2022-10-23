const prisma = require("../utils/db.utils");

exports.addFacilityProfile = async (req, res) => {
  const user = req.user;
  const { name, description } = req.body;
  try {
    const profile = await prisma.facilityProfile.create({
      data: {
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

exports.addUserProfile = async (req, res) => {};

exports.getFacilityProfile = async (req, res) => {};

exports.getUserProfile = async (req, res) => {};

exports.updateFacilityProfile = async (req, res) => {};

exports.updateUserProfile = async (req, res) => {};
