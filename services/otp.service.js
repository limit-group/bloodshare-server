const otpGenerator = require("otp-generator");

exports.generateOTP = () => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return otp;
};
