import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifyAdmin = async (authToken) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        verificationToken: authToken
      }
    });

    return user
  } catch (error) {
    throw new Error(error.message);
  }
};
