const prisma = require("../../utils/db.utils");
// my donations
exports.myDonations = async (req, res) => {
  const my_donations = await prisma.donation.findMany({
    where: {
      donorId: req.user.id,
    },
  });
  if (!my_donations) {
    return res.status(404).send("You have not made any donations");
  }
  res.send(201).send("Donation Saved.");
};

// I have donated
exports.donated = async (req, res) => {
  const { donor_number, facility } = req.body;
  const donation = await prisma.donation.create({
    data: {
      donorId: req.user.id,
      donorNumber: donor_number,
      facility: facility,
    },
  });
  if (!donation) {
    return res.status(500).send("Failed to record donation.");
  }

  const profile = await prisma.profile.update({
    where: {
      userId: req.user.id,
    },
    data: {
      bloodPoints: bloodPoints + 10,
    },
  });

  if (!profile) {
    return res.status(500).send("Failed to record donation.");
  }
  res.send(201).send("Donation Saved.");
};
