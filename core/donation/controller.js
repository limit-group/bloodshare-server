const prisma = require("../../utils/db.utils");
const { v4: uuidv4 } = require("uuid");

exports.allDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      orderBy: {
        id: "desc",
      },
    });
    res.status(200).send(donations);
  } catch (err) {
    return res.status(500).send({ message: "Failed to get donations" });
  }
};

// my donations
exports.myDonations = async (req, res) => {
  try {
    const my_donations = await prisma.donation.findMany({
      orderBy: {
        id: "desc",
      },
      where: {
        profileId: req.user.id,
      },
    });
    res.status(200).send(my_donations);
  } catch (err) {
    return res.status(404).send({ message: "You have not made any donations" });
  }
};

// I have donated
exports.donated = async (req, res) => {
  const { donor_number, facility, date } = req.body;
  try {
    await prisma.donation.create({
      data: {
        profileId: req.user.id,
        donorNumber: donor_number,
        facility: facility,
        donationDate: date,
      },
    });
    await prisma.profile.update({
      where: {
        userId: req.user.id,
      },
      data: {
        bloodPoints: {
          increment: 10,
        },
      },
    });

    res.status(201).send({ message: "Donation Saved." });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Failed to record donation." });
  }
};

exports.createRecord = async (req, res) => {
  const {
    name,
    bodyWeight,
    bloodType,
    donationDate,
    phoneNumber,
    dateOfBirth,
    gender,
    bloodUnit,
  } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });
    const record = await prisma.record.create({
      data: {
        name: name,
        phoneNumber: phoneNumber,
        dateOfBirth: new Date(dateOfBirth),
        bloodType: bloodType,
        bodyWeight: bodyWeight,
        donationDate: donationDate,
        donationId: uuidv4().replace(/-/g, '').substring(0, 7),
        bloodUnits: parseInt(bloodUnit),
        gender: gender,
        facilityId: user.facilityId,
      },
    });
    res.status(201).send({
      donationId: record.donationId,
    });
  } catch (err) {
    res.status(500).send({
      message: "failed to add record",
    });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id,
      },
    });
    const records = await prisma.record.findMany({
      where: {
        facilityId: user.facilityId,
      },
    });
    res.status(200).send(records);
  } catch (err) {
    res.status(500).send({
      message: "failed to fetch records",
    });
  }
};

exports.getAllRecords = async (req, res) => {
  try {
    const records = await prisma.record.findMany({});
    res.status(200).send(records);
  } catch (err) {
    res.status(500).send({
      message: "failed to fetch records",
    });
  }
};
