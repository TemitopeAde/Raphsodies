import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createBlog({ title, content, image, slug, author }) {
  try {
    if (!title || !content || !image || !slug || !author) {
      throw new Error("All fields are required");
    }

    const blog = await prisma.blog.create({
      data: { title, content, image, slug, author },
    });

    return { success: true, blog };
  } catch (error) {
    return { error: "Failed to create blog post" };
  }
}

export async function getBlogs() {
  try {
    return await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
  } catch (error) {
    return [];
  }
}
