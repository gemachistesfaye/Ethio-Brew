const nodemailer = require('nodemailer');
const fetch = require('node-fetch');

// 1. EMAIL SERVICE
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (to, subject, text, html) => {
    try {
        await transporter.sendMail({
            from: `"Ethio-Brew" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Email Error:', error);
    }
};

// 2. TELEGRAM SERVICE
const sendTelegram = async (message) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (!token || !chatId) {
        console.log('Telegram config missing, skipping notification.');
        return;
    }

    try {
        const url = `https://api.telegram.org/bot${token}/sendMessage`;
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: `☕ [ETHIO-BREW ALERT]\n\n${message}`,
                parse_mode: 'HTML'
            })
        });
        console.log('Telegram notification sent');
    } catch (error) {
        console.error('Telegram Error:', error);
    }
};

module.exports = { sendEmail, sendTelegram };
