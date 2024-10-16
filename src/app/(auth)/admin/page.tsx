import React from "react";
import Navbar from "@/components/shared/Navbar";
import { getAllProducts } from "@/lib/actions/product.action";
import { DataTable } from "@/components/DataTable";
import AddProductForm from "@/components/AddItemsModal";
import { LayoutDashboard } from "lucide-react";

const ProductPage = async () => {
  const allProductsDetailsResponse = await getAllProducts();
  if (
    allProductsDetailsResponse &&
    allProductsDetailsResponse.statusCode !== 200
  ) {
    return {
      notFound: true,
    };
  }
  const allProducts = allProductsDetailsResponse
    ? allProductsDetailsResponse.products
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <LayoutDashboard className="mr-2" />
            Product Dashboard
          </h1>
        </div>
        <div className="mb-6">
          <AddProductForm />
        </div>
        <div className="bg-card rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-card-foreground">
            Product List
          </h2>
          <DataTable data={allProducts} />
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
