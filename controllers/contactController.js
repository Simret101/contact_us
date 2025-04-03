const { sendEmails } = require("../services/emailService");

exports.handleContact = async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    const result = await sendEmails(email, subject, message);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
