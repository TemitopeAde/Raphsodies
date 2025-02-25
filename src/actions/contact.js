import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function saveContact({ name, email, phone, message }) {
  try {
    const contact = await prisma.contactUs.create({
      data: {
        name, 
        email, 
        phone, 
        message
      }
    });
    return contact;
  } catch (error) {
    console.warn(error);
    console.error("Database Error:", error); 
    throw new Error(`Database error: ${error.message}`);
  }
}