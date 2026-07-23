const nodemailer = require('nodemailer');

// Support generic SMTP settings (e.g. Resend, SendGrid, Mailgun) or fallback to Gmail
const isGmail = !process.env.SMTP_HOST;

const transporterConfig = isGmail
    ? {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        family: 4, // Force IPv4 to bypass Render's IPv6 connection block (ENETUNREACH)
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000,
        socketTimeout: 10000,
      }
    : {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        family: 4, // Force IPv4
        connectionTimeout: 10000, // 10 seconds
        greetingTimeout: 10000,
        socketTimeout: 10000,
      };

const transporter = nodemailer.createTransport(transporterConfig);

transporter.verify()
    .then(() => console.log('Email transporter verified OK'))
    .catch((err) => console.error('Email transporter FAILED:', err.message));

const sendEmail = async (options) => {
    const sender = process.env.SMTP_USER || process.env.EMAIL_USER;
    const mailOptions = {
        from: `"Ethio-Brew" <${sender}>`,
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
};

module.exports = sendEmail;
