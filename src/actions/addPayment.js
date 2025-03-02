import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createPayment({ userId, amount, reference, products, delivery, totalItems }) {
  try {
    if (!userId || !amount || !reference || !Array.isArray(products) || products.length === 0) {
      throw new Error("Missing required fields");
    }

    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user) throw new Error("User not found");

    const existingProducts = await prisma.product.findMany({
      where: { id: { in: products } },
    });

    if (existingProducts.length !== products.length) {
      throw new Error("One or more products not found");
    }

    const payment = await prisma.payment.create({
      data: {
        userId: Number(userId),
        userSnapshot: user,
        reference,
        delivery,
        totalItems,
        amount,
        status: "success",
        products: {
          connect: products.map((productId) => ({ id: productId })),
        },
      },
      include: { products: true },
    });

    return { success: true, payment };
  } catch (error) {
    console.error("Error creating payment:", error.message);
    return { success: false, error: error.message };
  }
}
