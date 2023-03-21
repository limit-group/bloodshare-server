
const prisma = require("../utils/db.utils");

// feeds by user id
exports.feedsByMe = async (req, res) => {
  try {
    const donations = await prisma.feed.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).send(donations);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Failed to fetch donation feed.",
    });
  }
};

// fecth donation feed.
exports.getFeeds = async (req, res) => {
  try {
    const donations = await prisma.feed.findMany({
      orderBy: {
        id: "desc",
      },
      take: 10,
    });
    res.status(200).send(donations);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Failed to fetch donation feed.",
    });
  }
};
// Share donation feed.
exports.createFeed = async (req, res) => {
  try {
    await prisma.feed.create({
      data: {
        information: req.body.description,
        media: req.file.filename,
        userId: req.user.id,
      },
    });
    res.status(201).send({
      message: "Donation BroadCast Success.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Failed to Create Feed",
    });
  }
};

// going button
exports.attendDrive = async (req, res) => {
  try {
    await prisma.feed.update({
      where: {
        id: parseInt(req.params.feedID),
      },
      data: {
        going: {
          increment: 1,
        },
      },
    });
    res.status(200).send({ message: "Accepted to attend drive." });
  } catch (err) {
    return res.status(500).send({ message: "Error, Accepting drive!" });
  }
};
