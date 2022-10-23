const prisma = require("../utils/db.utils");

exports.addUserAddress = async (req, res) => {
  const user = req.user;
  const { streetName, streetNumber, city, country } = req.body;

  try {
    const address = await prisma.address.create({
      data: {
        userId: user.id,
        streetName: streetName,
        streetNumber: streetNumber,
        city: city,
        country: country,
      },
    });

    res.status(200).send({
      message: "address addition successful",
      address: address,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(
      {
        message: "failed to add address, retry",
      },
      error
    );
  }
};

exports.addFacilityAddress = async (req, res) => {
  const { streetName, streetNumber, city, country, facility } = req.body;

  try {
    const address = await prisma.facilityAddress.create({
      data: {
        facilityId: facility,
        streetName: streetName,
        streetNumber: streetNumber,
        city: city,
        country: country,
      },
    });

    res.status(200).send({
      message: "address addition successful",
      address: address,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(
      {
        message: "failed to add address, retry",
      },
      error
    );
  }
};

exports.updateUserAddress = async (req, res) => {
  const user = req.user;
  const { streetName, streetNumber, city, country } = req.body;

  try {
    const address = await prisma.address.create({
      where: {
        userId: user.id,
      },
      data: {
        streetName: streetName,
        streetNumber: streetNumber,
        city: city,
        country: country,
      },
    });

    res.status(200).send({
      message: "address addition successful",
      address: address,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(
      {
        message: "failed to add address, retry",
      },
      error
    );
  }
};

exports.updateFacilityAddress = async (req, res) => {
  const { streetName, streetNumber, city, country, facility } = req.body;

  try {
    const address = await prisma.facilityAddress.findUnique({
      where: {
        facilityId: facility,
      },
      data: {
        streetName: streetName,
        streetNumber: streetNumber,
        city: city,
        country: country,
      },
    });
    res.status(200).send({
      message: "address updated",
      address: address,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(
      {
        message: "failed to update address, retry",
      },
      error
    );
  }
};

exports.getUserAddress = async (req, res) => {
  const user = req.user;
  try {
    const address = await prisma.address.findUnique({
      where: {
        userId: user.id,
      },
    });
    res.status(200).send({
      message: "address found",
      address: address,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(
      {
        message: "failed to retrieve address, retry",
      },
      error
    );
  }
};

exports.getFacilityAddress = async (req, res) => {
  const user = req.user;
  const { facility } = req.body;

  try {
    const address = await prisma.facilityAddress.findUnique({
      where: {
        facilityId: facility,
      },
    });
    res.status(200).send({
      message: "address found",
      address: address,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(
      {
        message: "failed to retrieve address, retry",
      },
      error
    );
  }
};
