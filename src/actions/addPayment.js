import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createPayment({ userId, amount, reference, products, delivery, totalItems }) {
  try {
    if (!userId || !amount || !reference || !Array.isArray(products) || products.length === 0) {
      throw new Error("Missing required fields");
    }

    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user) throw new Error("User not found");

    const productIds = products.map((product) => product.id); 
    console.log(productIds);
    

    const existingProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
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
        totalItems: Number(totalItems),
        amount: Number(amount),
        status: "success",
        products: {
          connect: productIds.map((id) => ({ id })),
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


export async function getPayments({ page = 1, limit = 20, search = "", status = "", sort = "desc" }) {
  try {
    const skip = (page - 1) * limit; // Calculate offset for pagination

    const where = {
      AND: [
        search ? { reference: { contains: search, mode: "insensitive" } } : {},
        status ? { status } : {},
      ],
    };

    // Fetch payments with filters and pagination
    const payments = await prisma.payment.findMany({
      where,
      include: { products: true, user: true },
      skip,
      take: Number(limit),
      orderBy: { createdAt: sort.toLowerCase() === "asc" ? "asc" : "desc" },
    });

    // Get total count for pagination
    const totalCount = await prisma.payment.count({ where });

    return {
      success: true,
      data: payments,
      pagination: {
        total: totalCount,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error) {
    console.error("Error fetching payments:", error.message);
    return { success: false, error: error.message };
  }
}