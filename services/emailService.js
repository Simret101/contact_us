const transporter = require("../config/nodemailerConfig");

exports.sendEmails = async (email, subject, message) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text: message,
    });

    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: "Failed to send email." };
  }
};
