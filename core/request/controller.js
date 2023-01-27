const prisma = require("../../utils/db.utils");

exports.requestByMe = async (req, res) => {
  try {
    // TODO: Get latest
    const broadcasts = await prisma.request.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).send(broadcasts);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong!");
  }
};

// List emergency feed
exports.getRequest = async (req, res) => {
  try {
    // TODO: Get latest
    const broadcasts = await prisma.request.findMany({});
    res.status(200).send(broadcasts);
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong!");
  }
};

// share emergency donation feed
exports.createRequest = async (req, res) => {
  const { bloodType, description } = req.body;
  const broadcast = await prisma.request.create({
    data: {
      userId: req.user.id,
      bloodType: bloodType,
      description: description,
    },
  });
  if (!broadcast) {
    return res.status(500).send({
      message: "Could not send blood request",
    });
  }

  // TODO: query users to send the request alerts
  res.status(201).send("Shared Successfully");
};

//when someone accept to donate
exports.acceptBroadcast = async (req, res) => {
  const user = req.user;
  const { accept, requestId } = req.body;

  if (checkAccepted(facility)) {
    return res.status(200).send({
      message: "people have already accepted to donate,.",
    });
  }
  const broadcast = await prisma.request.update({
    where: {
      id: requestId,
    },
    data: {
      accept: accept + 1,
    },
  });

  // TODO: Send message with directions.

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
  const facility = await prisma.request.findUnique({
    where: {
      id: facilityId,
    },
  });
  if (facility.accept == acceptCount) {
    return true;
  }
  return false;
}
