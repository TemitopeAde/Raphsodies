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
        price: parseFloat(data.price),
        stock: data.stock,
        imageUrl: data.imageUrl || '',
        label: data.label || '',
        otherDetails: data.otherDetails || {},
        categoryId: category.id,
        attributes: data.attributes || []
      },
    });

    return newProduct;
  } catch (error) {
    // console.error("Error creating product:", error.message);
    console.error("Stack trace:", error.stack);
    throw new Error(error.message);
  }
}
