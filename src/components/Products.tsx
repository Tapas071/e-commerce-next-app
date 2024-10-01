"use client"
import React, { useState } from "react";
import Image from "next/image";
import { FashionProduct } from "@/types";
import Link from "next/link";

interface ProductsProps {
  product: FashionProduct;
}

const Products: React.FC<ProductsProps> = ({ product }) => {
  // State to manage the count of items in the cart
  const [count, setCount] = useState(0);

  // Function to handle adding to the cart
  const handleAddToCart = () => {
    setCount(count + 1);
  };

  return (
    <div
      key={product._id}
      className="flex justify-center items-center w-full sm:w-1/3 p-4 m-2 rounded-lg shadow-md border border-muted bg-card text-card-foreground hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex flex-col items-center text-center space-y-2">
        <Link href={`/products/${product._id}`} key={product._id}>
          <h2 className="text-lg font-bold text-primary">{product.title}</h2>
          <p className="text-muted-foreground">{product.description}</p>
          <p className="text-accent-foreground font-semibold">
            ${product.price}
          </p>
          <p className="text-secondary">{product.category}</p>
          <p className="text-secondary">{product.brand}</p>
          <div className="mt-3">
            <Image
              src={product.images[0].url}
              alt="product"
              width={200}
              height={200}
              className="rounded-md object-cover"
            />
          </div>
        </Link>

        <div className="mt-4 flex items-center space-x-4">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
          >
            Add to Cart
          </button>
          {count > 0 && (
            <button
              onClick={() => setCount(count - 1)}
              className="px-4 py-2 bg-error text-error-foreground rounded hover:bg-error/90 transition"
            >
              Remove from Cart
            </button>
          )}
          {count != 0 && (
            <p className="text-secondary text-black">Count: {count}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
