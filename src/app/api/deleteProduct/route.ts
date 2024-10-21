// Import necessary modules and the FashionProductModel
import FashionProductModel from "@/lib/models/FashionProduct";
import { NextRequest, NextResponse } from "next/server";

// DELETE API to delete a product by ID
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;
    const id = params.get("id");

    // Check if the product ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Find the product by ID
    const product = await FashionProductModel.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete the product
    await FashionProductModel.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting the product:", error);
    return NextResponse.json(
      { error: "Error deleting the product" },
      { status: 500 }
    );
  }
}
