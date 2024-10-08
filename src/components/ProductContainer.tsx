"use client"
import React from "react";
import useProductData from "../hooks/useProductData";
import Image from "next/image";
import { FashionProduct } from "@/types";
import Products from "./Products";
import Link from "next/link";


const ProductContainer: React.FC = () => {
  const { products, loading, error } = useProductData() as { products: FashionProduct[], loading: boolean, error: any };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <h1>Product List</h1>

      <div className="w-full flex gap 3  gap-1 bg-red-400">
        {products.map((product) => (
            <Products key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductContainer;
