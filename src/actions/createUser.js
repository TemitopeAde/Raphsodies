import { sendVerificationEmail } from "@/utils/sendVerification";
import { PrismaClient } from "@prisma/client";
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function createUser(email, name, password) {
  
  try {
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password,
        verificationToken,
        isVerified: false
      }
    });
    await sendVerificationEmail(email, verificationToken);

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error.message);
    console.error("Stack trace:", error.stack);
    throw new Error("Error creating user");
  }
}
