import nodemailer from 'nodemailer';

export async function sendVerificationEmail(email, token) {
  const verificationUrl = `${process.env.ORIGIN}/verify-user?token=${token}`;
  const domain = process.env.ORIGIN.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
  const brandName = "African Rhapsody"
  
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 465,
    secure: false,
    auth: {
      user: "92811f8dd53a82",
      pass: "38750aa7fb02d2"
    },
  });

  const mailOptions = {
    from: `"${brandName} Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Verify Your ${brandName} Account`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #4F46E5;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .header h1 {
            color: white;
            margin: 0;
            font-size: 24px;
          }
          .content {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 0 0 8px 8px;
            border: 1px solid #e1e1e1;
            border-top: none;
          }
          .button {
            display: inline-block;
            background-color: #4F46E5;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
          }
          .text-center {
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${brandName}</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Thank you for signing up for ${brandName}! To complete your registration and verify your email address, please click the button below:</p>
            
            <div class="text-center">
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </div>
            
            <p>This link will expire in 24 hours for security reasons.</p>
            
            <p>If you didn't create an account with ${brandName}, you can safely ignore this email.</p>
            
            <p>If you're having trouble clicking the button, you can also copy and paste the following link into your browser:</p>
            <p style="word-break: break-all; font-size: 12px;">${verificationUrl}</p>
            
            <p>Best regards,<br>The ${brandName} Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${brandName}. All rights reserved.</p>
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
  const response = await transporter.sendMail(mailOptions);
  return response
}