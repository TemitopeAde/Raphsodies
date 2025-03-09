
import {  NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// Get all coupons
export async function GET() {
  try {
   

    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(coupons);
  } catch (error) {
    console.error('Error fetching coupons:', error);
    return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 });
  }
}

// Create a new coupon
export async function POST(request) {
  try {
    

    const data = await request.json();
    
    // Validate input data
    if (!data.code || !data.discountType || !data.discountValue) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Store code in uppercase for consistency
    data.code = data.code.toUpperCase();
    
    // Parse dates
    if (data.startDate) data.startDate = new Date(data.startDate);
    if (data.endDate) data.endDate = new Date(data.endDate);
    
    // Create the coupon
    const coupon = await prisma.coupon.create({
      data
    });

    return NextResponse.json(coupon, { status: 201 });
  } catch (error) {
    console.error('Error creating coupon:', error.code);
    
    // Check for unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A coupon with this code already exists' }, { status: 400 });
    }
    
    return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 });
  }
}