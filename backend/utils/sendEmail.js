const nodemailer = require('nodemailer');

/**
 * Consolidated email service.
 *
 * Uses Gmail's `service` transport so EMAIL_HOST and EMAIL_PORT are NOT
 * required — only EMAIL_USER (address) and EMAIL_PASS (app password).
 * This matches the configuration already working in notificationService.js.
 */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (options) => {
    const mailOptions = {
        from: `"Ethio-Brew" <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
