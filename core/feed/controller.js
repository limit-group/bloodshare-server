const { uploadImage } = require("../../services/media.service");
const prisma = require("../../utils/db.utils");

// feeds by user id

exports.feedsByMe = async (req, res) => {
  const donations = await prisma.donationFeed.findMany({
    where: {
      userId: req.user.id,
    },
  });
  if (!donations) {
    return res.status(500).send({
      message: "Failed to fetch donation feed.",
    });
  }
  res.send(200).send(donations);
};

// fecth donation feed.
exports.getFeeds = async (req, res) => {
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
exports.createFeed = async (req, res) => {
  const { media, description, longitude, latitude } = req.body;
  const feed_url = uploadImage(media);
  if (!feed_url) {
    return res.status(500).send("Failed to create feed.");
  }
  const donation = await prisma.donationFeed.create({
    data: {
      description: description,
      media: feed_url,
      latitude: latitude,
      longitude: longitude,
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
