import { PrismaClient } from "@prisma/client";
import bcryptjs from 'bcryptjs';
import { resendVerificationEmail } from "./resendToken";

const prisma = new PrismaClient();

export async function loginUser(email, password) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.isVerified) {
      await resendVerificationEmail(email);
      // throw new Error("Account not verified. A new verification email has been sent.");
      return
    }

    
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      // throw new Error('Invalid password');
      return 
    }
    
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    throw new Error(error.message);
  }
}
