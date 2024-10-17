import Navbar from "@/components/shared/Navbar";
import { getProductById } from "@/lib/actions/product.action";
import { SearchParamProductIdProps } from "@/types";
import React from "react";
import Image from "next/image";

const ProductDetailPage = async ({
  params: { id },
}: SearchParamProductIdProps) => {
  const response = await getProductById(id);
  const product = response?.product;

  if (response && response.statusCode === 404) {
    return {
      notFound: true,
    };
  }

  const imageUrl = product.images[0]?.url || "/images/placeholder.png"; // Fallback image

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-card rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <div className="relative h-96 w-full md:w-96">
                <Image
                  src={imageUrl}
                  alt={product.images[0]?.alt || "Product Image"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl md:rounded-l-xl md:rounded-t-none"
                />
              </div>
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-accent-foreground font-semibold">
                {product.brand}
              </div>
              <h1 className="mt-1 text-3xl font-bold text-primary">
                {product.title}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {product.description}
              </p>

              <div className="mt-4 flex items-center">
                <div className="text-2xl font-bold text-accent-foreground">
                  ${product.price.toFixed(2)}
                </div>
                <div className="ml-4 text-sm text-muted-foreground">
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </div>
              </div>

              <div className="mt-4">
                <span className="text-yellow-500 text-lg">
                  {"★".repeat(Math.round(product.ratings.average))}
                </span>
                <span className="text-muted-foreground ml-2">
                  ({product.ratings.count} reviews)
                </span>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <div className="flex flex-wrap">
                  <div className="w-full sm:w-1/2 mb-4">
                    <strong className="text-primary">Category:</strong>
                    <span className="ml-2 text-muted-foreground">
                      {product.category}
                    </span>
                  </div>
                  <div className="w-full sm:w-1/2 mb-4">
                    <strong className="text-primary">Sizes:</strong>
                    <span className="ml-2 text-muted-foreground">
                      {product.sizes.join(", ")}
                    </span>
                  </div>
                  <div className="w-full sm:w-1/2 mb-4">
                    <strong className="text-primary">Colors:</strong>
                    <span className="ml-2 text-muted-foreground">
                      {product.colors.join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
