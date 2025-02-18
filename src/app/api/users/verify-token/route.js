import { verifyToken } from "@/actions/verifyToken";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Verification token is missing." },
        { status: 400 }
      );
    }

    const response = await verifyToken(token);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to verify token." },
      { status: 400 }
    );
  }
}
