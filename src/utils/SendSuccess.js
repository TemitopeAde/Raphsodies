import nodemailer from 'nodemailer';

export async function sendOrderConfirmationEmail(email) {
//   const trackingUrl = `${process.env.ORIGIN}/track-order?id=${orderDetails.orderId}`;
  const shopUrl = `${process.env.ORIGIN}/products`;
  const brandName = "African Rhapsody";
  
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
    from: `${process.env.EMAIL_USER}`,
    to: email,
    subject: `🎉 Success! Your ${brandName} Glow Journey Starts Now!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
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
            background: linear-gradient(135deg, #8B4513, #CD853F);
            padding: 25px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .header h1 {
            color: white;
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }
          .content {
            background-color: #ffffff;
            padding: 35px;
            border-radius: 0 0 8px 8px;
            border: 1px solid #e1e1e1;
            border-top: none;
          }
          .success-message {
            font-size: 22px;
            font-weight: 600;
            color: #8B4513;
            text-align: center;
            margin-bottom: 20px;
          }
          .welcome-text {
            text-align: center;
            margin-bottom: 30px;
            font-size: 16px;
          }
          .steps-header {
            font-size: 18px;
            font-weight: 600;
            color: #8B4513;
            margin-top: 25px;
            margin-bottom: 15px;
          }
          .step-item {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
          }
          .step-icon {
            color: #CD853F;
            font-weight: bold;
            margin-right: 10px;
          }
          .support-section {
            background-color: #FFF8DC;
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
          }
          .social-section {
            text-align: center;
            margin: 25px 0;
            font-weight: 500;
          }
          .button-container {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 30px;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #8B4513, #CD853F);
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: bold;
            text-align: center;
          }
          .footer {
            text-align: center;
            margin-top: 25px;
            font-size: 12px;
            color: #666;
          }
          .highlight {
            font-weight: bold;
            color: #8B4513;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>African Rhapsody</h1>
          </div>
          <div class="content">
            <div class="success-message">🎉 Success! Your Glow Journey Starts Now!</div>
            
            <p class="welcome-text">
              Thank you for choosing <span class="highlight">African Rhapsody</span>—where ancient African beauty secrets meet modern skincare science. Your order has been received, and we're already preparing your products with care.
            </p>
            
            <div class="steps-header">✨ What's Next?</div>
            
            <div class="step-item">
              <span class="step-icon">✅</span>
              <span>You'll receive a confirmation email shortly with your order details.</span>
            </div>
            
            <div class="step-item">
              <span class="step-icon">✅</span>
              <span>Our team is working to ensure speedy delivery right to your doorstep.</span>
            </div>
            
            <div class="step-item">
              <span class="step-icon">✅</span>
              <span>Get ready for radiant, healthy skin—because you deserve it!</span>
            </div>
            
            <div class="support-section">
              <p><span class="highlight">💬 Got questions? Need skincare tips?</span></p>
              <p>We're here for you! Reach out to us anytime at <a href="mailto:support@africanrhapsody.com">support@africanrhapsody.com</a></p>
            </div>
            
            <div class="social-section">
              🌿 <span class="highlight">Follow us on Instagram <a href="https://instagram.com/AfricanRhapsody">@AfricanRhapsody</a></span> for skincare tips, exclusive deals, and real results from our amazing community.
            </div>
            
            <p class="success-message">🚀 Your skin transformation starts NOW!</p>
            
            <div class="button-container">
              <a href="${shopUrl}" class="button">Continue Shopping</a>
              <a href="${shopUrl}" class="button">Track Your Order</a>
            </div>
          </div>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} African Rhapsody. All rights reserved.</p>
            <p>This email was sent to ${email}</p>
            <p><a href="${process.env.ORIGIN}/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a> | <a href="${process.env.ORIGIN}/privacy">Privacy Policy</a></p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  return await transporter.sendMail(mailOptions);
}