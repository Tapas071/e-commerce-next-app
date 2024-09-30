import dbConnect from "@/lib/db";
import FashionProductModel from "@/lib/models/FashionProduct";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {

  try{
    const data = await req.json();
    await dbConnect();
    const newProduct = await FashionProductModel.create(data);
    await newProduct.save();

    return NextResponse.json(newProduct, { status: 200 });
  }catch(error){
    return NextResponse.json({error : "error has been occured"},{status : 500})
  }
}