const { createTransport } = require("nodemailer");
const { config } = require("dotenv");

config();
const transporter = createTransport({
  //host: "smtp.ethereal.email",
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.CORREOSERVICEME,
    pass: process.env.CORREOSERVICEMEPASS,
  },
});

async function enviarcorreo(mailOptions) {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (err) {
    console.log(err);
  }
}

module.exports = enviarcorreo;
