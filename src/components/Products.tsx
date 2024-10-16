"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CartItem, FashionProduct } from "@/types";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cart/cartSliceActual";

interface ProductsProps {
  product: FashionProduct;
}

const Products: React.FC<ProductsProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(0);

  const handleAddToCart = (cartItem: CartItem) => {
    console.log("handleAddToCart has been called");
    dispatch(addToCart(cartItem));
    setCount(count + 1);
  };

  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <Link href={`/products/${product._id}`} className="block">
        <div className="relative h-64 w-full">
          <Image
            src={product.images[0].url}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-primary mb-2 truncate">
            {product.title}
          </h2>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-bold text-accent-foreground">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-secondary">{product.category}</span>
          </div>
          <p className="text-xs text-secondary">{product.brand}</p>
        </div>
      </Link>
      <div className="p-4 bg-secondary/20">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              handleAddToCart({
                id: product._id,
                name: product.title,
                price: product.price,
                quantity: 1,
              });
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-300 flex-grow mr-2"
          >
            Add to Cart
          </button>
          {count > 0 && (
            <div className="flex items-center">
              <button
                onClick={() => setCount(count - 1)}
                className="px-3 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors duration-300"
              >
                -
              </button>
              <span className="mx-2 font-semibold">{count}</span>
              <button
                onClick={() => setCount(count + 1)}
                className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-300"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
