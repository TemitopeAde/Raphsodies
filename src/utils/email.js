// src/utils/email.js
import nodemailer from 'nodemailer';

export async function sendPasswordResetEmail(email, resetLink) {
  const transporter = nodemailer.createTransport({
    host: "africanrhapsody.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`,
  };

  await transporter.sendMail(mailOptions);
}
