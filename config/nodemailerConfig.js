require("dotenv").config();
const transporter = require("../config/nodemailerConfig");

const sendEmail = async (to, name, text) => {
  const subject = name ? `Message from ${name}` : "New Contact Form Submission";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
