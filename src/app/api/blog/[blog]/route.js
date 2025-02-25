import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req) {
  console.log();

  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    console.log(id);
    
    const data = await req.json();

    // Validate required fields
    if (!data.title || !data.content || !data.author) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update the blog in your database
    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        author: data.author,
        // Only update image if provided
        ...(data.image && { image: data.image })
      }
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    

    // Delete the blog from your database
    await prisma.blog.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET(req) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


