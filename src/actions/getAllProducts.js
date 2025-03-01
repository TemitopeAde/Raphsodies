import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function getAllProducts({ page = 1, limit = 10, search = "", category, minPrice, maxPrice }) {
  try {
    const skip = (page - 1) * limit;
    const filters = {};

    if (search) {
      filters.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (category) {
      filters.category = {
        name: { equals: category, mode: "insensitive" }
      };
    }

    if (minPrice) {
      filters.price = { gte: parseFloat(minPrice) };
    }

    if (maxPrice) {
      filters.price = { ...filters.price, lte: parseFloat(maxPrice) };
    }

    const products = await prisma.product.findMany({
      where: filters,
      include: { category: true },
      skip,
      take: parseInt(limit),
      orderBy: { createdAt: "desc" },
    });

    const totalProducts = await prisma.product.count({ where: filters });

    return { products, totalProducts, totalPages: Math.ceil(totalProducts / limit) };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}
