// app/api/coupons/validate/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { code, cartTotal } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
    }

    // Find the coupon
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() }
    });

    // Check if coupon exists
    if (!coupon) {
      return NextResponse.json({ error: 'Invalid coupon code' }, { status: 404 });
    }

    // Check if coupon is active
    if (!coupon.isActive) {
      return NextResponse.json({ error: 'This coupon is no longer active' }, { status: 400 });
    }

    // Check if coupon is expired
    if (coupon.endDate && new Date() > coupon.endDate) {
      return NextResponse.json({ error: 'This coupon has expired' }, { status: 400 });
    }

    // Check if coupon has reached max uses
    if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
      return NextResponse.json({ error: 'This coupon has reached its maximum usage limit' }, { status: 400 });
    }

    // Check minimum order amount
    if (coupon.minOrderAmount && cartTotal < coupon.minOrderAmount) {
      return NextResponse.json({
        error: `This coupon requires a minimum order of ${(coupon.minOrderAmount / 100).toLocaleString('en-US', { style: 'currency', currency: 'NGN' })}`
      }, { status: 400 });
    }

    // Calculate discount amount
    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = Math.round((cartTotal * coupon.discountValue) / 100);
    } else {
      // Fixed amount discount
      discountAmount = Math.min(coupon.discountValue, cartTotal); // Can't discount more than cart total
    }

    return NextResponse.json({
      success: true,
      coupon,
      discountAmount,
      discountedTotal: cartTotal - discountAmount
    });
  } catch (error) {
    console.error('Error validating coupon:', error);
    return NextResponse.json({ error: 'Failed to validate coupon' }, { status: 500 });
  }
}