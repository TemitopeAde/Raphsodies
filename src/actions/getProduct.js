import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function getProductById(productId) {
    try {
      return await prisma.product.findUnique({
        where: { id: productId },
        include: { category: true }, 
      });
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw new Error(error.message);
    }
  }