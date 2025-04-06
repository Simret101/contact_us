const transporter = require("../config/nodemailerConfig");

exports.sendEmails = async (email, name, message) => {

  const senderName = name && name.trim().length > 0 ? name : "Anonymous";

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Message from ${senderName}`,  
      text: message,
    });

    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: "Failed to send email." };
  }
};
