import { deleteProduct } from "@/actions/deleteProduct";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    console.log(params.products);
    
    try {
      const productId = params.products; 
  
      if (!productId) {
        return NextResponse.json(
          { error: "Product ID is required" },
          { status: 400 }
        );
      }
  
      const deletedProduct = await deleteProduct(productId);
  
      return NextResponse.json({
        message: "Product deleted successfully",
        product: deletedProduct
      }, { status: 200 });
  
    } catch (error) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
  
      console.error("Error deleting product:", error);
      return NextResponse.json(
        { error: "Failed to delete product" },
        { status: 500 }
      );
    }
  }
  