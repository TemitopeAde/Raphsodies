import { NextResponse } from 'next/server';
import { initialize } from "@/actions/initialize-paystack";

export async function POST(req) {
  try {
    const { email, amount, cartItems, deliveryInfo } = await req.json();

    if (!email || !amount || !cartItems?.length || !deliveryInfo) {
      return NextResponse.json({ 
        message: 'Email, amount, cart items, and delivery info are required' 
      }, { status: 400 });
    }

    const params = {
      email,
      amount: amount * 100,
      callback_url: "https://raphsodies.vercel.app/checkout-success",
      metadata: {
        cartItems: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity
        })),
        totalItems: cartItems.reduce((acc, item) => acc + item.quantity, 0),
        delivery: {
          firstName: deliveryInfo.firstName,
          lastName: deliveryInfo.lastName,
          address: deliveryInfo.address,
          phoneNumber: deliveryInfo.phoneNumber,
          city: deliveryInfo.city,
          state: deliveryInfo.state,
          country: deliveryInfo.country
        }
      }
    };

    const response = await initialize(params);
    return NextResponse.json(response?.data, { status: 200 });
  } catch (error) {
    console.error("Paystack API error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}