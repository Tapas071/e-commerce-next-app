import { FashionProduct } from "@/types";
import dbConnect from "../db";
import FashionProductModel from "../models/FashionProduct";
import { handleError } from "../utils";

export const addProduct = async (productData: FashionProduct) => {
  try {
    //  const product: FashionProduct = {
    //    title: productData.title,
    //    description: productData.description,
    //    price: parseFloat(productData.price.toString()), // Ensure price is a string before converting to number
    //    category: productData.category,
    //    images: productData.images,
    //    sizes: productData.sizes,
    //    colors: productData.colors,
    //    stock: parseInt(productData.stock.toString(), 10), // Convert number to string before parsing
    //    brand: productData.brand,
    //    ratings: {
    //      average: 0, // Default rating
    //      count: 0, // Default count
    //    },
    //    createdAt: new Date(),
    //    updatedAt: new Date(),
    //  };
     console.log(productData);

    // await dbConnect();
    // const newProduct = await FashionProductModel.create(product);
    
    const newProduct = "";
    console.log(newProduct);
    return {
      statusCode: 200,
      product: JSON.parse(JSON.stringify(newProduct)),
    };
  } catch (error) {
    handleError(error);
  }
};

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

export const updateProduct = async (id: string, formattedData: any) => {
  try {
    await dbConnect();
    const product = "hello";
    // const product = await FashionProductModel.findById(id);
    // if(!product){
    //   return {
    //     statusCode: 404,
    //     message: "Product not found",
    //   };
    // }
    // find the product and update it
    // const updatedProduct = await FashionProductModel.findByIdAndUpdate(id, productData);
    return {
      statusCode: 200,
      product: JSON.parse(JSON.stringify(product)),
    };
  } catch (error) {
    handleError(error);
  }
};