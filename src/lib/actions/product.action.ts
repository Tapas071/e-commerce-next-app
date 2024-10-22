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

export const addFeaturedProduct = async (productId: string) => {
  try {
    // await dbConnect();
    // const product = await FashionProductModel.findById(productId);
    // if (!product) {
    //   return {
    //     statusCode: 404,
    //     message: "Product not found",
    //   };
    // }
    // product.isFeatured = true;
    // await product.save();
    // return {
    //   statusCode: 200,
    //   message: "Product added to featured products",
    // };
  } catch (error) {
    handleError(error);
  }
}