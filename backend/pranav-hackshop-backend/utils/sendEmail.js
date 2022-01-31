const { emailId, emailPass } = require("../config/keys");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 465,
  secure: true,
  auth: {
    user: emailId,
    pass: emailPass,
  },
});

let sendEmail = async (email, subject, html) => {
  let info = await transporter.sendMail({
    from: '"HackShop" <hey@adityaraj.co>',
    to: email,
    subject: subject,
    text: "",
    html: html,
  });
  console.log(info.messageId);
};

module.exports = {
  sendEmail,
};
