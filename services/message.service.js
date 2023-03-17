const AfricasTalking = require("africastalking");

const africastalking = AfricasTalking({
  apiKey: process.env.AT_KEY,
  username: process.env.AT_NAME,
});

module.exports.sendSMS = async (params) => {
  try {
    await africastalking.SMS.send({
      // to: [`${params.to}`],
      to: ["+254713023515"],
      message: `${params.message}`,
      enqueue: true,
      from: `blood-share`,
    })
      .then((res) => {
        if (res.SMSMessageData["Recipients"][0]["status"] == "success") {
          return true;
        }
        console.log(res.SMSMessageData["Recipients"]);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports.sendAlert = async (params) => {
  console.log(params.to);
  try {
    await africastalking.SMS.send({
      // to: `${params.to}`,
      to: ["+254713023515"],
      enqueue: true,
      message: `Hi, you have a blood donation request. To accept to go donate open BloodShare App.`,
      from: `blood-share`,
    }).then((res) => {
      if (res.SMSMessageData["Recipients"][0]["status"] == "success") {
        return true;
      }
      console.log(res.SMSMessageData["Recipients"]);
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports.confirmAcceptance = async (params) => {
  try {
    await africastalking.SMS.send({
      // to: [`${params.to}`],
      to: ["+254713023515"],
      message: `Thank you for accepting the donation request, you have been queued as a donor
      at https://www.google.com/maps/search/?api=1&query=${params.latitude}%2C${params.longitude}. Move swiftly to save a life.`,
      from: `blood-share`,
    }).then((res) => {
      if (res.SMSMessageData["Recipients"][0]["status"] == "success") {
        return true;
      }
      console.log(res.SMSMessageData["Recipients"]);
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};
