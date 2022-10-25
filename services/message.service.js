const credentials = {
  apiKey: process.env.AT_KEY, // use your sandbox app API key for development in the test environment
  username: process.env.AT_NAME, // use 'sandbox' for development in the test environment
};

const Africastalking = require("africastalking")(credentials);

const sms = Africastalking.SMS;

module.exports.sendSMS = async (params) => {
  try {
    let info = await sms.send({
      to: params.to,
      message: params.message,
    });
    return info;
  } catch (err) {
    console.log(err);
    return false;
  }
};
