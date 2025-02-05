import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserByEmail(email) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
  
      return user;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new Error('Error fetching user by email');
    }
  }