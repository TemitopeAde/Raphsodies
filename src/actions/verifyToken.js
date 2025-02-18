import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function verifyToken(token) {
  try {
    const user = await prisma.user.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      throw new Error("Invalid or expired verification token.");
    }

    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null, 
      },
    });

    return { message: "Account successfully verified." };
  } catch (error) {
    throw new Error(error.message);
  }
}
