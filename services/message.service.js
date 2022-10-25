const AfricasTalking = require('africastalking');

const africastalking = AfricasTalking({
  apiKey: process.env.AT_KEY,
  username: process.env.AT_NAME,
});

// TODO: Complete the AT messaging Service
module.exports.sendSMS = async (params) => {
  try {
    let info = await africastalking.SMS.send({
      to: params.to,
      message: params.message,
    })
      .then((res) => {
        console.log(res);
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
