const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify()
    .then(() => console.log('Email transporter verified OK'))
    .catch((err) => console.error('Email transporter FAILED:', err.message));

const sendEmail = async (options) => {
    const mailOptions = {
        from: `"Ethio-Brew" <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
};

module.exports = sendEmail;
