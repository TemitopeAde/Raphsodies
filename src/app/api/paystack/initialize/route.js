import { NextResponse } from 'next/server';
import { initialize } from "@/actions/initialize-paystack";


const ORIGIN = "https://raphsodies.vercel.app"

export async function POST(req) {
  try {
    const body = await req.json();
    // console.log({body});
    
    const { email, cartItems, deliveryInfo, userId } = body;

    // console.log({ email, amount, cartItems, deliveryInfo, userId });
    
    
    if (!email ||  !cartItems?.length || !deliveryInfo || !userId) {
      return NextResponse.json({ 
        message: 'Email, userId, cart items, and delivery info are required' 
      }, { status: 400 });
    }
    
    const currencies = cartItems.map(item => item.currency);
    const uniqueCurrencies = [...new Set(currencies)];
    
    if (uniqueCurrencies.length > 1) {
      return NextResponse.json({
        message: 'Multiple currencies detected in the cart. Please ensure all items have the same currency.'
      }, { status: 400 });
    }

    const currency = uniqueCurrencies[0]; 

    // console.log({cartItems});
    

    const netAmount = cartItems?.reduce((acc, item) => {
      const itemPrice = Number(item.price) || 0;
      return acc + itemPrice * item.quantity;
    }, 0) * 100;
    
    const params = {
      email,
      amount: netAmount,
      currency: currency,
      callback_url: `${ORIGIN}/checkout-success`,
      metadata: {
        userId,
        cartItems: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.currency === 'USD' ? item.priceDollar : item.price,
          quantity: item.quantity,
          total: (item.currency === 'USD' ? item.priceDollar : item.price) * item.quantity,
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
    console.log({response});
    return NextResponse.json(response?.data, { status: 200 });
  } catch (error) {
    console.error("Paystack API error:", error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
