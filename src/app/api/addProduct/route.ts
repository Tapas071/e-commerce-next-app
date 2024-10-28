import dbConnect from "@/lib/db";
import FashionProductModel from "@/lib/models/FashionProduct";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    await dbConnect();

    // Parse images, sizes, and colors from JSON strings
    const images = JSON.parse(data.images);
    const sizes = JSON.parse(data.sizes);
    const colors = JSON.parse(data.colors);

    const newProductMappedData = {
      title: data.title,
      description: data.description,
      price: parseFloat(data.price), // Convert price to float
      category: "Footwear", 
      images: images, 
      sizes: sizes, 
      colors: colors, 
      stock: parseInt(data.stock), // Convert stock to integer
      brand: data.brand,
    };

    const newProduct = await FashionProductModel.create(newProductMappedData);
    await newProduct.save();

    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error has occurred" },
      { status: 500 }
    );
  }
}
