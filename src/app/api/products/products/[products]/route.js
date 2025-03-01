import { deleteProduct } from "@/actions/deleteProduct";
import { getProductById } from "@/actions/getProduct";
import { updateProduct } from "@/actions/updateProduct";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const productId = url.pathname.split("/").pop();
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const deletedProduct = await deleteProduct(productId);

    return NextResponse.json(
      {
        message: "Product deleted successfully",
        product: deletedProduct
      },
      { status: 200 }
    );
  } catch (error) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  // console.log(req);
  
  try {
    const url = new URL(req.url);
    const productId = url.pathname.split("/").pop();
    const body = await req.json();
    console.log({ body });

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const updatedProduct = await updateProduct(productId, body);

    return NextResponse.json(
      {
        message: "Product updated successfully",
        product: updatedProduct
      },
      { status: 200 }
    );
  } catch (error) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    const productId = params.products;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await getProductById(productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Product retrieved successfully",
        product
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
