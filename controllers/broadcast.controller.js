const prisma = require("../utils/db.utils");

async function facilityInfo(id) {
  const facility = await prisma.facility.findUnique({
    where: {
      id: id,
    },
  });
  if (facility) {
    return facility;
  }
}
// emergency donation
exports.emergencyBroadcast = async (req, res) => {
  const checkfacility = req.user;
  const facility = facilityInfo(checkfacility.id);
  const { bloodType } = req.body;
  const broadcast = await prisma.emergencyBroadcast.create({
    data: {
      facility: facility,
      bloodType: bloodType,
    },
  });

  if (!broadcast) {
    return res.status(500).send({
      message: "Could not send brodcast",
    });
  }

  res.status(201).send({
    message: "Broadcast sent successfully.",
  });
};

//when someone accept to donate
exports.acceptBroadcast = async (req, res) => {
  const user = req.user
  const { accept, facility } = req.body;

  if (checkAccepted(facility)) {
    return res.status(200).send({
      message: "Broadcast Closed.",
    });

  }
  const broadcast = await prisma.emergencyBroadcast.update({
    where: {
      facilityId: facility,
      accept: accept + 1,
      userId: user.id
    },
  });

  if (!broadcast) {
    return res.status(500).send({
      message: "Could not complete request.",
    });
  }

  res.status(200).send({
    message: "Thank for accepting to save lives.",
  });
};



async function checkAccepted(facilityId) {
  const acceptCount = 3;
  const facility = await prisma.emergencyBroadcast.findUnique({
    where: {
      id: facilityId,
    },
  });
  if (facility.accept == acceptCount) {
    return true;
  }
  return false;
}

exports.getEmergencyBroadcast = async (req, res) => {
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
