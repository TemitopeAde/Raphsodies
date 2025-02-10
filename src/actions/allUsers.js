import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers({ page = 1, limit = 10, name }) {
  try {
    const skip = (page - 1) * limit;
    const where = name ? { name: { contains: name, mode: "insensitive" } } : {}; // Search by name (optional)
    
    const users = await prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const totalUsers = await prisma.user.count({ where });

    return {
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}
