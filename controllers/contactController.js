const { sendEmail } = require("../services/emailService");

exports.handleContact = async (req, res) => {
  const { email, name, message } = req.body;  

  try {
    const result = await sendEmail(email, name, message);  
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
