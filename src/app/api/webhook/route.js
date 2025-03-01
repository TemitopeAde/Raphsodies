import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
  const paystackWebhookSecret = process.env.TEST_SECRET_KEY;

  try {
    const paystackSignature = request.headers.get('x-paystack-signature');

    if (!paystackSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
    }

    const rawBody = await request.text();
    console.log({rawBody});
    

    const computedSignature = crypto
      .createHmac('sha512', paystackWebhookSecret)
      .update(rawBody)
      .digest('hex');

    if (computedSignature !== paystackSignature) {
      return NextResponse.json({ message: 'Invalid webhook signature' }, { status: 403 });
    }

    const event = JSON.parse(rawBody);
    console.log({event});
    

    switch (event.event) {
      case 'charge.success':
        await handleSuccessfulCharge(event.data);
        break;
      default:
        console.log('Unhandled Paystack event:', event.event);
    }
    console.log({event});
    
    return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 });
  } catch (error) {
    console.error('Webhook verification error:', error);
    return NextResponse.json({ message: 'Webhook processing error' }, { status: 500 });
  }
}

async function handleSuccessfulCharge(chargeData) {

  console.log('Successful charge:', chargeData);
  console.log('cart', chargeData.metadata.cartItems);
  
}

