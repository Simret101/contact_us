require("dotenv").config();
const transporter = require("../config/nodemailerConfig");

const sendEmail = async (to, name, text) => {
  
  console.log("Name passed to sendEmail:", name); 

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Message from ${name}`,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
