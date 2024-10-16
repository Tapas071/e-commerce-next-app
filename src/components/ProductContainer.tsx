"use client";

import React from "react";
import useProductData from "../hooks/useProductData";
import { FashionProduct } from "@/types";
import Products from "./Products";

const ProductContainer: React.FC = () => {
  const { products, loading, error } = useProductData() as {
    products: FashionProduct[];
    loading: boolean;
    error: any;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-destructive text-destructive-foreground rounded-md p-4">
          Error: {error.message}
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Product List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Products key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductContainer;
