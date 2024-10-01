import Navbar from "@/components/shared/Navbar";
import { getProductById } from "@/lib/actions/product.action";
import { SearchParamProductIdProps } from "@/types";
import React from "react";

const page = async ({ params: { id } }: SearchParamProductIdProps) => {
  const response = await getProductById(id);
  const product = response?.product;

  if (response && response.statusCode === 404) {
    return {
      notFound: true,
    };
  }

  const imageUrl = product.images[0]?.url || "/images/placeholder.png"; // Fallback image

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        {/* <h1 className="text-2xl font-bold mb-4">Product ID: {id}</h1> */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={product.images[0]?.alt || "Product Image"}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-3">{product.description}</p>
            <div className="text-lg font-bold text-red-600 mb-3">
              ${product.price.toFixed(2)}
            </div>
            <div className="mb-3">
              <span className="font-semibold">Ratings: </span>
              <span className="text-yellow-500">
                {product.ratings.average} ⭐
              </span>
              <span className="text-gray-500">
                {" "}
                ({product.ratings.count} reviews)
              </span>
            </div>
            <div className="specs">
              <div className="mb-2">
                <strong>Category:</strong> {product.category}
              </div>
              <div className="mb-2">
                <strong>Brand:</strong> {product.brand}
              </div>
              <div className="mb-2">
                <strong>Stock:</strong> {product.stock} available
              </div>
              <div className="mb-2">
                <strong>Sizes:</strong> {product.sizes.join(", ")}
              </div>
              <div className="mb-2">
                <strong>Colors:</strong> {product.colors.join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
