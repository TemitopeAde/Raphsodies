import { createPayment } from "@/actions/addPayment";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const response = await createPayment(body);

    if (!response.success) {
      return NextResponse.json({ error: response.error }, { status: 400 });
    }

    return NextResponse.json({ message: "Payment created", payment: response.payment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
