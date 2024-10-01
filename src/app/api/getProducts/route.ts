import dbConnect from "@/lib/db";
import FashionProductModel from "@/lib/models/FashionProduct";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {
  try {
     await dbConnect();
     const data = await FashionProductModel.find({});
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Some Error has been occured" },
      { status: 500 }
    );
  }
}
