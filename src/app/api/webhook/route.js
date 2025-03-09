import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createPayment } from '@/actions/addPayment';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function POST(request) {
  const paystackWebhookSecret = process.env.TEST_SECRET_KEY;

  try {
    const paystackSignature = request.headers.get('x-paystack-signature');

    if (!paystackSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 400 });
    }

    const rawBody = await request.text();
    
    const computedSignature = crypto
      .createHmac('sha512', paystackWebhookSecret)
      .update(rawBody)
      .digest('hex');

    if (computedSignature !== paystackSignature) {
      return NextResponse.json({ message: 'Invalid webhook signature' }, { status: 403 });
    }

    const event = JSON.parse(rawBody);
    
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

  try {
    console.log('Successful charge:', chargeData);
    console.log('cart', chargeData.metadata.cartItems);

    const userId = chargeData?.metadata.userId;
    const amount = Number(chargeData?.amount)/100;
    const reference = chargeData?.reference
    const products = chargeData?.metadata.cartItems 
    const delivery = chargeData?.metadata.delivery
    const totalItems = chargeData.metadata.totalItems

    const res = await createPayment({ userId, amount, reference, products, delivery, totalItems })



    for (const item of products) {
      
      
      await prisma.product.update({
        where: { id: item.id }, 
        data: {
          stock: {
            decrement: Number(item.quantity), 
          },
        },
      });
    }
    console.log(res);
  } catch (error) {
    console.warn(error);
  }
  
}

