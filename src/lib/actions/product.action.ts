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