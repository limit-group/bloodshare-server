const MAIL_SETTINGS = {
  service: "gmail",
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
};

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport(MAIL_SETTINGS);
module.exports.sendMail = async (params) => {
  try {
    let info = await transporter.sendMail({
      from: MAIL_SETTINGS.auth.user,
      to: params.to,
      subject: "Verify your Dona Account",
      html: `
            <div class="container" style="max-width: auto; padding-top: 20px">
                <h2>Thank you for taking a step into saving lives.</h2>
                <p  style="margin-bottom: 30px">Please enter the sign up OTP to start with the bigger life saving mission</p>
                <h1 style="font-size: 40px; letter-spacing: 2px; text-align: center;">${params.otp}</h1>
            </div>
`,
    });
    return info;
  } catch (error) {
    console.log(error);
    return false;
  }
};
