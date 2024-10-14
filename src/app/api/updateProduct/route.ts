// import TodoModel from "@/models/Todo";
import FashionProductModel from "@/lib/models/FashionProduct";
import { NextRequest, NextResponse } from "next/server";
export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;
    const id = params.get("id");
    const updatedData = await req.json();
    
    const Product = await FashionProductModel.findById(id);
    if (!Product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const UpdatedProduct = await FashionProductModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure the data follows the schema validation
      }
    );
    // Extract the Authorization header from the request
    // const authHeader = req.headers.get("Authorization");

    // if (!authHeader) {
    //   return NextResponse.json(
    //     { error: "Authorization header missing" },
    //     { status: 401 }
    //   );
    // }

    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating the product" },
      { status: 500 }
    );
  }
}
