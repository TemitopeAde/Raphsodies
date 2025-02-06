import { NextResponse } from 'next/server';
import { initialize } from "@/actions/initialize-paystack";


export async function POST(req) {
  const { email, amount } = await req.json();

  const params = {
    email,
    amount,
    callback_url: "https://raphsodies.vercel.app/checkout-success"
  };

  try {
    const response = await initialize(params);
    return NextResponse.json(response?.data, { status: 200 });
  } catch (error) {
    console.error("Paystack API error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
