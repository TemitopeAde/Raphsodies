// src/utils/email.js
import nodemailer from 'nodemailer';

export async function sendPasswordResetEmail(email, resetLink) {
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
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
  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <p>You requested a password reset.</p>
      <p>Click the button below to reset your password:</p>
      <a 
        href="${resetLink}" 
        style="
          display: inline-block;
          padding: 10px 20px;
          margin-top: 10px;
          background-color: #007BFF;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        "
      >
        Reset Password
      </a>
      <p>If you did not request this, you can safely ignore this email.</p>
    </div>
  `,
};


  await transporter.sendMail(mailOptions);
}
