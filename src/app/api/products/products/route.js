import { getAllProducts } from "@/actions/getAllProducts";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 100;
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || null;
    const minPrice = searchParams.get("minPrice") || null;
    const maxPrice = searchParams.get("maxPrice") || null;

    const data = await getAllProducts({ page, limit, search, category, minPrice, maxPrice });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


