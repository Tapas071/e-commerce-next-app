"use client"
import React from "react";
import useProductData from "../hooks/useProductData";
import { FashionProduct } from "@/types";
import Products from "./Products";

const ProductContainer: React.FC = () => {
  const { products, loading, error } = useProductData() as { products: FashionProduct[], loading: boolean, error: any };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      {/* <h1>Product List</h1> */}

      <div className="w-full flex gap 3  gap-1">
        {products.map((product) => (
            <Products key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductContainer;
