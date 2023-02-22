const prisma = require("../../utils/db.utils");

exports.allDonations = async (req, res) => {
  const donations = await prisma.donation.findMany({
    orderBy: {
      id: "desc",
    },
  });
  if (!donations) {
    return res.status(500).send({ message: "Failed to get donations" });
  }
  res.status(200).send(donations);
};

// my donations
exports.myDonations = async (req, res) => {
  const my_donations = await prisma.donation.findMany({
    orderBy: {
      id: "desc",
    },
    where: {
      profileId: req.user.id,
    },
  });
  if (!my_donations) {
    return res.status(404).send({ message: "You have not made any donations" });
  }
  res.status(200).send(my_donations);
};

// I have donated
exports.donated = async (req, res) => {
  const { donor_number, facility, date } = req.body;
  const donation = await prisma.donation.create({
    data: {
      profileId: req.user.id,
      donorNumber: donor_number,
      facility: facility,
      donationDate: date,
    },
  });
  if (!donation) {
    return res.status(500).send({ message: "Failed to record donation." });
  }

  const profile = await prisma.profile.update({
    where: {
      userId: req.user.id,
    },
    data: {
      bloodPoints: {
        increment: 10,
      },
    },
  });

  if (!profile) {
    return res.status(500).send({ message: "Failed to record donation." });
  }
  res.send(201).send({ message: "Donation Saved." });
};
