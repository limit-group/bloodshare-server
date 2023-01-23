const prisma = require("../utils/db.utils");

// List emergency feed
exports.getEmergencyFeed = async (req, res) => {
  try {
    // TODO: Get latest
    const broadcasts = await prisma.donation.findMany({});
    res.status(200).send(broadcasts);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong!");
  }
};

// share emergency donation feed
exports.emergencyFeed = async (req, res) => {
  const { bloodType, description } = req.body;
  const broadcast = await prisma.emergencyFeed.create({
    data: {
      userId: req.user.id,
      bloodType: bloodType,
      description: description,
    },
  });
  if (!broadcast) {
    return res.status(500).send({
      message: "Could not send emergency feed",
    });
  }
  res.status(201).send("Shared Successfully");
};

//when someone accept to donate
exports.acceptBroadcast = async (req, res) => {
  const user = req.user;
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
      userId: user.id,
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
