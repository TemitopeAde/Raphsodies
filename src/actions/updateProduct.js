import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function updateProduct(productId, updatedData) {
  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: { category: true }
    });

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    let category = await prisma.category.findUnique({
      where: { name: updatedData.categoryName }
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: data.categoryName
        }
      });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: updatedData.name || existingProduct.name,
        price: updatedData.price || existingProduct.price,
        stock: updatedData.stock || existingProduct.stock,
        categoryId: category.id || existingProduct.categoryId,
        imageUrl: updatedData.imageUrl || existingProduct.imageUrl,
        description: updatedData.description || existingProduct.description,
        attributes: updatedData.attributes || existingProduct.attributes,
        priceDollar: updatedData.priceDollar || existingProduct.priceDollar
      },
      include: { category: true }
    });

    return updatedProduct;
  } catch (error) {
    console.error("Stack trace:", error.stack);
    throw new Error(error.message);
  }
}
