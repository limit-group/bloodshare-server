const { uploadImage } = require("../../services/media.service");
const prisma = require("../../utils/db.utils");

// feeds by user id

exports.feedsByMe = async (req, res) => {
  const donations = await prisma.feed.findMany({
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
  const donations = await prisma.feed.findMany({
    orderBy: {
      id: "desc",
    },
    take: 10,
  });
  if (!donations) {
    return res.status(500).send({
      message: "Failed to fetch donation feed.",
    });
  }
  res.status(200).send(donations);
};
// Share donation feed.
exports.createFeed = async (req, res) => {
  const { media, description } = req.body;
  const feed_url = uploadImage(media);
  const donation = await prisma.feed.create({
    data: {
      information: description,
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
