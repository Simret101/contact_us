require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { validateContact } = require('./middleware/validateRequest');
const logger = require("./config/logger"); // Import the logger

const app = express();
app.use(express.json());
app.use(cors());

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    logger.error("Missing EMAIL_USER or EMAIL_PASS in environment variables.");
    process.exit(1); // Stop execution
}

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact form route
app.post('/api/contact', validateContact, async (req, res) => {
    const { email, subject, message } = req.body;

    try {
        // Send email
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission: ${subject}`,
            text: `From: ${email}\n\n${message}`
        };

        await transporter.sendMail(mailOptions);
        logger.info(`Email sent successfully from ${email}`);

        res.status(200).json({ success: 'Message sent successfully' });

    } catch (error) {
        logger.error(`Error processing request: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
