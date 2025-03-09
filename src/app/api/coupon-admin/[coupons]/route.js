
import {  NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Update a coupon
export async function PATCH(request) {
  try {
    const url = new URL(request.url);
    const couponId = url.pathname.split("/").pop();

    // Get request body
    const data = await request.json();

    // Find the coupon first to check if it exists
    const existingCoupon = await prisma.coupon.findUnique({
      where: { id: couponId }
    });

    if (!existingCoupon) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    // Update the coupon
    const updatedCoupon = await prisma.coupon.update({
      where: { id: couponId },
      data: {
        // Only update fields that are provided
        ...(data.code !== undefined && { code: data.code.toUpperCase() }),
        ...(data.discountType !== undefined && {
          discountType: data.discountType
        }),
        ...(data.discountValue !== undefined && {
          discountValue: Number(data.discountValue)
        }),
        ...(data.minOrderAmount !== undefined && {
          minOrderAmount:
            data.minOrderAmount === null ? null : Number(data.minOrderAmount)
        }),
        ...(data.maxUses !== undefined && {
          maxUses: data.maxUses === null ? null : Number(data.maxUses)
        }),
        ...(data.startDate !== undefined && {
          startDate: new Date(data.startDate)
        }),
        ...(data.endDate !== undefined && {
          endDate: data.endDate === null ? null : new Date(data.endDate)
        }),
        ...(data.isActive !== undefined && { isActive: Boolean(data.isActive) })
      }
    });

    return NextResponse.json(updatedCoupon);
  } catch (error) {
    console.error("Error updating coupon:", error);

    // Check for unique constraint violation (e.g., duplicate code)
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A coupon with this code already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update coupon" },
      { status: 500 }
    );
  }
}

// Delete a coupon
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const couponId = url.pathname.split("/").pop();
    

    

    // Find the coupon first to check if it exists
    const existingCoupon = await prisma.coupon.findUnique({
      where: { id: couponId }
    });

    if (!existingCoupon) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    // Delete the coupon
    await prisma.coupon.delete({
      where: { id: couponId }
    });

    return NextResponse.json({
      success: true,
      message: "Coupon deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting coupon:", error);

    // Check if the coupon is related to any payments
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          error:
            "Cannot delete this coupon as it is being used in one or more payments"
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete coupon" },
      { status: 500 }
    );
  }
}
