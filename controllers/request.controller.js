const {
  sendAlert,
  confirmAcceptance,
} = require("../services/message.service");
const prisma = require("../utils/db.utils");

exports.requestByMe = async (req, res) => {
  try {
    const broadcasts = await prisma.request.findMany({
      where: {
        userId: req.user.id,
      },
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

// List emergency feed
exports.getRequest = async (req, res) => {
  try {
    const broadcasts = await prisma.request.findMany({
      orderBy: {
        id: "desc",
      },
    });
    const new_b = [];
    broadcasts.forEach((element) => {
      if (element.accept < 3) {
        new_b.push(element);
      }
    });
    res.status(200).send(new_b);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong!" });
  }
};

// latest request
exports.getLatestRequest = async (req, res) => {
  try {
    const donations_count = await prisma.donation.count();
    const request_count = await prisma.request.count();
    const broadcasts = await prisma.request.findMany({
      orderBy: {
        id: "desc",
      },
      take: 2,
    });
    const new_b = [];
    broadcasts.forEach((element) => {
      if (element.accept < 3) {
        new_b.push(element);
      }
    });
    res.status(200).send({
      broadcasts: new_b,
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
  let {
    bloodGroup,
    requestType,
    when,
    needed,
    patientName,
    relationship,
    diagnosis,
    biography,
    latitude,
    longitude,
  } = req.body;

  if (requestType == "SELF") {
    // find user
    let profile = await prisma.profile.findUnique({
      where: {
        userId: req.user.id,
      },
    });
    let patientName = profile.name;
    return patientName;
  }
  try {
    // query users to send the request alerts
    const profiles = await prisma.profile.findMany({
      where: {
        bloodType: bloodGroup,
      },
      select: {
        user: {
          select: {
            phoneNumber: true,
          },
        },
      },
    });
    if (!profiles) {
      return res.status(500).send({
        message: "Could not send blood request!",
      });
    }
    let recipients = [];
    profiles.map((prof) => {
      recipients.push(prof["user"]["phoneNumber"]);
    });
    //send the alert messages.
    if (profiles.length > 0) {
      const info = await sendAlert({ to: recipients, name: req.user.name });
      if (info) {
        console.log("sms sent.");
      } else {
        console.log("sending sms failed.");
      }
    }
    //create broadcast
    const broadcast = await prisma.request.create({
      data: {
        userId: req.user.id,
        bloodGroup: bloodGroup,
        requestType: requestType,
        date: when,
        diagnosis: diagnosis,
        biography: biography,
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        bloodUnits: parseInt(needed),
        patientName: patientName,
        relationship: relationship,
      },
    });
    if (!broadcast) {
      return res.status(500).send({
        message: "Could not send blood request!",
      });
    }

    res.status(201).send("Shared Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "failed to create request" });
  }
};

//when someone accept to donate
exports.acceptBroadcast = async (req, res) => {
  const acceptCount = 3;
  try {
    const request = await prisma.request.findUnique({
      where: {
        id: parseInt(req.params.requestId),
      },
    });
    if (request.accept < acceptCount) {
      const request = await prisma.request.update({
        where: {
          id: parseInt(req.params.requestId),
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
          id: request.userId,
        },
      });

      // Send message with directions.
      await confirmAcceptance({
        to: user.phoneNumber,
        latitude: request.latitude,
        longitude: request.longitude,
      });
      res.status(201).send({
        message: "Thank for accepting to save lives.",
      });
    } else {
      return res.status(200).send({
        message: "enough people have already accepted to donate.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Could not complete request.",
    });
  }
};
