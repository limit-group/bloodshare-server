const prisma = require("../utils/db.utils");

exports.scheduleDonation = async (req, res) => {
  const facility = req.user;
  const { when, venue, description } = req.body;

  const donation = await prisma.donationBroadCast.create({
    data: {
      when: when,
      venue: venue,
      description: description,
      facility: facility.id,
    },
  });
  if (!donation) {
    return res.status(500).send({
      message: "Donation Brodcast failed",
    });
  }

  res.status(201).send({
    message: "Donation BroadCast Success.",
  });
};

exports.donationFeed = async (req, res) => {
  const donations = await prisma.donationBroadCast.findMany();
  if (!donations) {
    return res.status(500).send({
      message: "Failed to fetch donation feed.",
    });
  }

  res.send(200).send(donations);
};

exports.getDonationCentres = async (req, res) => {
  const filters = req.query;
  const data = await prisma.user.findMany({});
  console.log(data);
  const filteredCenters = data.filter((user) => {
    let isValid = true;
    for (key in filters) {
      console.log(key, user[key], filters[key]);
      isValid = isValid && user[key] == filters[key];
    }
    return isValid;
  });
  res.status(200).send(filteredCenters);
};
