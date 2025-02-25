import { createBlog, getBlogs } from "@/actions/blog";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const response = await createBlog(body);

    if (response.error) {
      return NextResponse.json({ error: response.error }, { status: 400 });
    }

    return NextResponse.json(response.blog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const blogs = await getBlogs();
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}



