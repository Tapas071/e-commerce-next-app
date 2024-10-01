import EditProduct from "@/components/EditProduct";
import Navbar from "@/components/shared/Navbar";
import { getProductById } from "@/lib/actions/product.action";
import { SearchParamProductIdProps } from "@/types";
import React, { useState } from "react";

const Page = async ({ params: { id } }: SearchParamProductIdProps) => {
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
      <EditProduct product={product} />
    </>
  );
};

export default Page;
