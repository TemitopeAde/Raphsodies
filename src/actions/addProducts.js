import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createProduct(data) {
  try {
    let category = await prisma.category.findUnique({
      where: { name: data.categoryName },
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: data.categoryName,
        },
      });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description || '',
        price: parseFloat(data.price) || 0,
        stock: data.stock || 0,
        imageUrl: data.imageUrl || '',
        categoryId: category.id || "",
        attributes: data.attributes || [],
        priceDollar: data.priceDollar || 0
      },
    });

    return newProduct;
  } catch (error) {
    
    console.error("Stack trace:", error.stack);
    throw new Error(error.message);
  }
}
