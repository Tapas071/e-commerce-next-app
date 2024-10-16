import dbConnect from "@/lib/db";
import FashionProductModel from "@/lib/models/FashionProduct";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {

  try{
    const data = await req.json();
    // console.log(data);

    await dbConnect();
    // const newProductMappedData = {
    //   title: data.title,
    //   description: data.description,
    //   price: data.price,
    //   // category: data.category ,
    //   images: data.images,
    //   sizes: data.sizes,
    //   colors: data.colors,
    //   stock: data.stock,
    //   brand: data.brand,
    // };
    // const newProduct = "sample new Product"
    // console.log(newProductMappedData);
    const newProduct = await FashionProductModel.create(data);
    // await newProduct.save();


    return NextResponse.json(newProduct, { status: 200 });
  }catch(error){
    console.log(error);
    return NextResponse.json({error : "error has been occured"},{status : 500})
  }
}