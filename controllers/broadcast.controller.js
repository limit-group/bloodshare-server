const prisma = require("../utils/db.utils");
// donation schedule
exports.getDonationBroadcasts = async (req, res) => {
  try {
    const broadcasts = await prisma.donationBroadCast.findMany({ take: 10 });
    res.status(200).send(broadcasts);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong!",
    });
  }
};

exports.donationBroadcast = async (req, res) => {
  const { when, venue, facilityId, description } = req.body;
  const facilityProfile = await prisma.facilityProfile.findUnique({
    where: {
      facilityId: facilityId,
    },
  });
  try {
    if (!facilityProfile) {
      res.status(500).send({
        message: "something went wrong.",
      });
    }
    const broadcast = await prisma.donationBroadCast.create({
      data: {
        facilityId: facilityId,
        facilityProfileId: facilityProfile.id,
        when: when,
        description: description,
        venue: venue,
      },
    });
    res.status(200).send(broadcast);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong.",
    });
  }
};

exports.singleDonationBroadCast = async (req, res) => {
  const broadcast = await prisma.donationBroadCast.findUnique({
    where: {
      id: req.broadcastId,
    },
  });
  if (!broadcast) {
    res.status(404).send({
      message: "donation not found",
    });
  } else {
    res.status(200).send(broadcast);
  }
};

exports.updateSingleDonationBroadcast = async (req, res) => {
  const { when, venue, facilityId, description } = req.body;
  const facilityProfile = await prisma.facilityProfile.findUnique({
    where: {
      facilityId: facilityId,
    },
  });
  try {
    if (!facilityProfile) {
      res.status(500).send({
        message: "something went wrong.",
      });
    }
    const broadcast = await prisma.donationBroadCast.update({
      where: {
        id: req.broadcastId,
      },
      data: {
        facilityId: facilityId,
        facilityProfileId: facilityProfile.id,
        when: when,
        description: description,
        venue: venue,
      },
    });
    res.status(200).send(broadcast);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "something went wrong.",
    });
  }
};

// emergency donation
exports.getEmergencyBroadcast = async (req, res) => {};
exports.emergencyBroadcast = async (req, res) => {};
