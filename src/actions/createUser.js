import { sendVerificationEmail } from "@/utils/sendVerification";
import { PrismaClient } from "@prisma/client";
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function createUser(email, name, password) {
  try {
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const userCount = await prisma.user.count();
    const role = userCount === 0 ? "admin" : "user";

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
        verificationToken,
        isVerified: false,
        role
      },
    });
    const res = await sendVerificationEmail(email, verificationToken);
    

    // console.log({email, verificationToken});
    
    return newUser;
  } catch (error) {
    
    if (error.code === 'P2002') {
      
      if (error.meta?.target?.includes('email')) {
        throw new Error('Email already in use');
      }
    }

    // Log detailed error information
    console.error("Error creating user:", error.message);
    console.error("Stack trace:", error.stack);

    // Throw a generic error for other cases
    throw new Error("Error creating user");
  } finally {
    // Ensure Prisma client is disconnected to avoid connection leaks
    await prisma.$disconnect();
  }
}