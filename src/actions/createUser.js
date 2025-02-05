import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createUser(email, name) {
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    return newUser;
  } catch (error) {
    throw new Error('Error creating user');
  }
}
