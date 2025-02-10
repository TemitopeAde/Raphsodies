import { getUsers } from "@/actions/allUsers";
import { NextResponse } from "next/server";


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const name = searchParams.get("name") || "";

    const data = await getUsers({ page, limit, name });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
