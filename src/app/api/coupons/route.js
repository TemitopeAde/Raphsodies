import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { code, totalCost } = await request.json(); // Changed `cartTotal` to `totalCost` to match frontend

    if (!code) {
      return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
    }

    // Find the coupon
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    // Check if coupon exists
    if (!coupon) {
      return NextResponse.json({ error: 'Invalid coupon code' }, { status: 404 });
    }

    // Check if coupon is active
    if (!coupon.isActive) {
      return NextResponse.json({ error: 'This coupon is no longer active' }, { status: 400 });
    }

    // Check if coupon has started
    if (coupon.startDate && new Date() < new Date(coupon.startDate)) {
      return NextResponse.json({ error: 'This coupon is not yet valid' }, { status: 400 });
    }

    // Check if coupon is expired
    if (coupon.endDate && new Date() > new Date(coupon.endDate)) {
      return NextResponse.json({ error: 'This coupon has expired' }, { status: 400 });
    }

    // Check if coupon has reached max uses
    if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
      return NextResponse.json({ error: 'This coupon has reached its maximum usage limit' }, { status: 400 });
    }

    // Check minimum order amount
    if (coupon.minOrderAmount && totalCost < coupon.minOrderAmount) {
      return NextResponse.json({
        error: `This coupon requires a minimum order of ${(coupon.minOrderAmount / 100).toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}`,
      }, { status: 400 });
    }

    // Calculate discount amount
    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = Math.round((totalCost * coupon.discountValue) / 100);
    } else {
      // Fixed amount discount
      discountAmount = Math.min(coupon.discountValue, totalCost); // Can't discount more than total
    }

    return NextResponse.json({
      discountAmount, // Match what frontend expects
    }, { status: 200 });
  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json({ error: 'Failed to validate coupon' }, { status: 500 });
  }
}