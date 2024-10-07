import dbConnect from "../db";
import FashionProductModel from "../models/FashionProduct";
import { handleError } from "../utils";


export const getProductById = async (id:string)=>{
  try{
    await dbConnect();
    const product = await FashionProductModel.findById(id);
    if(!product){
      return {
        statusCode: 404,
        message: "Product not found",
      };
    }
    return {
      statusCode: 200,
      product: JSON.parse(JSON.stringify(product)),
    };
  }
  catch(error){
    handleError(error);
  }
}
export const getAllProducts = async () => {

  try{
    await dbConnect();
    const products = await FashionProductModel.find({});
    return {
      statusCode: 200,
      products: JSON.parse(JSON.stringify(products)),
    };
  }
  catch(error){
    handleError(error);
  }
}