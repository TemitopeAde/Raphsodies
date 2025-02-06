
import { NextResponse } from 'next/server';
import crypto from 'crypto';

const secret = process.env.TEST_SECRET_KEY;

export async function POST(req) {
  try {
    const body = await req.json();
    const signature = req.headers.get('x-paystack-signature');

    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(body)).digest('hex');

    if (hash === signature) {
      const event = body;
      console.log('Received valid Paystack event:', event);

      return NextResponse.json({ status: 'success' }, { status: 200 });
    } else {
      console.error('Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
