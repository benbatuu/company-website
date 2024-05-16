const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

import { env } from 'bun';

export default function sendEmail(token: string) {
    token = jwt.sign(token, env.JWT_SECRET);
    const html = `
        <h1>Hi there</h1>
        <p>https://bennbatuu.com/auth/resetpassword?token=${token} </p>
    `;

    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: { user: 'bennbatuu@gmail.com', pass: '1905Batuhan.' },
    });

    const info = transporter.sendMail({
        from: 'Batuhan Küçük <bennbatuu@gmail.com>',
        to: 'bennbatuu@gmail.com',
        subject: 'Reset Password Magic Link',
        html: html,
    });
    console.log('Message id ' + info.response);
}
