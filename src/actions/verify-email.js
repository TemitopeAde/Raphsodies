import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function verifyUserEmail(token) {
  try {
    if (!token) {
      throw new Error('Invalid or missing token');
    }

    const user = await prisma.user.findUnique({
      where: { verificationToken: token },
    });

    if (!user) {
      throw new Error('Invalid or expired token');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true, verificationToken: null },
    });

    return { success: true, message: 'Email verified successfully. You can now log in.' };
  } catch (error) {
    console.error('Error verifying email:', error);
    return { success: false, message: error.message };
  }
}
