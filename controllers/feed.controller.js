const { uploadImage } = require("../services/media.service");
const prisma = require("../utils/db.utils");

// fecth donation feed.
exports.getDonationFeed = async (req, res) => {
  // TODO: Filter by latest date.
  const donations = await prisma.donationFeed.findMany();
  if (!donations) {
    return res.status(500).send({
      message: "Failed to fetch donation feed.",
    });
  }
  res.send(200).send(donations);
};
// Share donation feed.
exports.createDonationFeed = async (req, res) => {
  const { media, description } = req.body;
  const feed_url = uploadImage(media);
  if (!feed_url) {
    return res.status(500).send("Failed to create feed.");
  }
  const donation = await prisma.donationFeed.create({
    data: {
      description: description,
      media: feed_url,
      userId: req.user.id,
    },
  });
  if (!donation) {
    return res.status(500).send({
      message: "Failed to Create Feed",
    });
  }
  res.status(201).send({
    message: "Donation BroadCast Success.",
  });
};
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
    res.status(500).send("Failed to record donation.");
  }
  res.send(201).send("Donation Saved.");
};
