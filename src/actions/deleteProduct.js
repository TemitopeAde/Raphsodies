import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function deleteProduct(productId) {
    try {
      const existingProduct = await prisma.product.findUnique({
        where: { id: productId },
        include: { category: true }
      });
  
      if (!existingProduct) {
        throw new Error("Product not found");
      }
  
      // Delete the product
      const deletedProduct = await prisma.product.delete({
        where: { id: productId },
        include: { category: true }
      });
  
      return deletedProduct;
    } catch (error) {
      console.error("Stack trace:", error.stack);
      throw new Error(error.message);
    }
  }