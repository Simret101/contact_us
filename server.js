require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { validateContact } = require('./middleware/validateRequest');
const logger = require("./config/logger"); 

const app = express();
app.use(express.json());
app.use(cors());


if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    logger.error("Missing EMAIL_USER or EMAIL_PASS in environment variables.");
    process.exit(1); 
}


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


app.post('/api/contact', validateContact, async (req, res) => {
    const { name, email, message } = req.body;

    try {
        
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: `New Contact Form Submission: ${name || "Anonymous"}`,
            name:`${message}`,
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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
