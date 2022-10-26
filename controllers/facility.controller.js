const prisma = require("../utils/db.utils");
const { uploadImage } = require("../services/media.service");
exports.createFacility = async (req, res) => {
  const {
    name,
    mission,
    streetName,
    streetNumber,
    city,
    country,
    licenseNumber,
  } = req.body;
  const facility = await prisma.facility.create({
    data: {
      name: name,
      mission: mission,
      streetName: streetName,
      streetNumber: streetNumber,
      city: city,
      country: country,
      licenseNumber: licenseNumber,
    },
  });
  if (!facility) {
    res.status(500).send({
      message: "could not create facility profile",
    });
  } else {
    res.status(200).send(facility);
  }
};
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
exports.updateFacility = async (req, res) => {
  const {
    name,
    mission,
    streetName,
    streetNumber,
    city,
    country,
    licenseNumber,
  } = req.body;
  const profile = await prisma.facility.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      name: name,
      mission: mission,
      streetName: streetName,
      streetNumber: streetNumber,
      city: city,
      country: country,
      licenseNumber: licenseNumber,
    },
  });
  if (!profile) {
    res.status(404).send({
      message: "profile unavailable for update!",
    });
  }
  res.status(200).send(profile);
};
exports.deleteFacility = async (req, res) => {
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
