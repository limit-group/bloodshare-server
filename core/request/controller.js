const {
  sendAlert,
  confirmAcceptance,
} = require("../../services/message.service");
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
    res.status(500).send({ message: "Something went wrong!" });
  }
};

// List emergency feed
exports.getRequest = async (req, res) => {
  try {
    const broadcasts = await prisma.request.findMany({
      orderBy: {
        id: "desc",
      },
    });
    res.status(200).send(broadcasts);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
};

// latest request
exports.getLatestRequest = async (req, res) => {
  console.log("hit here");
  try {
    const donations_count = await prisma.donation.count();
    const request_count = await prisma.request.count();
    const broadcasts = await prisma.request.findMany({
      orderBy: {
        id: "desc",
      },
      take: 1,
    });
    res.status(200).send({
      broadcasts: broadcasts,
      request_count: request_count,
      donations_count: donations_count,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
};

// share emergency donation feed
exports.createRequest = async (req, res) => {
  const {
    bloodGroup,
    requestType,
    when,
    needed,
    patientName,
    relationship,
    latitude,
    longitude,
  } = req.body;
  const broadcast = await prisma.request.create({
    data: {
      userId: req.user.id,
      bloodGroup: bloodGroup,
      requestType: requestType,
      date: when,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      bloodUnits: needed,
      patientName: patientName,
      relationship: relationship,
    },
  });
  if (!broadcast) {
    return res.status(500).send({
      message: "Could not send blood request!",
    });
  }

  // TODO: query users to send the request alerts
  const profile = await prisma.profile.findMany({
    take: 10,
    where: {},
    select: {
      user: {
        phoneNumber: true,
      },
    },
  });
  // const info = await sendAlert({ to: user.phoneNumber, name: req.user.name, });
  res.status(201).send("Shared Successfully");
};

//when someone accept to donate
exports.acceptBroadcast = async (req, res) => {
  if (checkAccepted(req.params.requestId)) {
    return res.status(200).send({
      message: "people have already accepted to donate.",
    });
  }
  try {
    const request = await prisma.request.update({
      where: {
        id: req.params.requestId,
      },
      data: {
        accept: {
          increment: 1,
        },
      },
    });

    //find user
    const user = await prisma.user.findUnique({
      where: {
        userId: request.userId,
      },
    });

    // Send message with directions.
    const info = confirmAcceptance({
      to: user.phoneNumber,
      latitude: request.latitude,
      longitude: request.longitude,
    });

    if (info) {
      res.status(200).send({
        message: "Thank for accepting to save lives.",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Could not complete request.",
    });
  }
};

async function checkAccepted(reqId) {
  const acceptCount = 3;
  const request = await prisma.request.findUnique({
    where: {
      id: reqId,
    },
  });
  if (request.accept == acceptCount) {
    return true;
  }
  return false;
}
