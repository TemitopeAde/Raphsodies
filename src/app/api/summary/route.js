import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch total counts
    const totalProducts = await prisma.product.count();
    const totalOrders = await prisma.payment.count();
    const totalUsers = await prisma.user.count();

    const summaryData = {
      totalProducts,
      totalOrders,
      totalUsers,
    };

    return NextResponse.json(summaryData, { status: 200 });
  } catch (error) {
    console.error("Error fetching summary data:", error);
    return NextResponse.json({ error: "Failed to fetch summary data" }, { status: 500 });
  }
}
