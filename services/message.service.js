const AfricasTalking = require("africastalking");

const africastalking = AfricasTalking({
  apiKey: process.env.AT_KEY,
  username: process.env.AT_NAME,
});

// TODO: Complete the AT messaging Service
module.exports.sendSMS = async (params) => {
  try {
    let info = await africastalking.SMS.send({
      to: [`${params.to}`],
      message: `${params.message}`,
      enqueue: true,
    })
      .then((res) => {
        console.log("Messaging Response.......", res);
      })
      .catch((err) => {
        console.log(err);
      });
    return info;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports.sendAlert = async (params) => {
  try {
    let alert = await africastalking.SMS.send({
      to: [`${params.to}`],
      message: `Hi, ${params.name}, you have a blood donation request, 
      from ${params.user}. To accept to go donate reply with the word yes.`,
    }).then((res) => {
      console.log(res);
    });
    return alert;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports.confirmAcceptance = async (params) => {
  try {
    let confirm = await africastalking.SMS.send({
      to: [`${params.to}`],
      message: `Thank you for accepting the donation request, you have been queued as a donor
      at ${params.facility}. Move swiftly to save a life.`,
    }).then((res) => {
      console.log(res);
    });
    return confirm;
  } catch (err) {
    console.log(err);
    return false;
  }
};
