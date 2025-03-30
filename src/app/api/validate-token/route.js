import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function GET(request) {
  const authToken = await getCookie("authToken", { req: request });
  
  
  if (!authToken) {
    return NextResponse.json({ isAdmin: false }, { status: 401 });
  }

  let isAdmin = false; // Default value

  try {
    // Verify and decode JWT
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET); // Ensure JWT_SECRET is set
    const userId = decoded.id; // Get user ID from token payload

    // Query database for user role
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    

    isAdmin = user?.role === "admin" || false; // Set isAdmin based on user role
  } catch (error) {
    console.error("Error validating token:", error.message); // Log only the message to avoid circular references
    // isAdmin remains false by default
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json({ isAdmin }); // Always return an object
}