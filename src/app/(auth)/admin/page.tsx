import Navbar from '@/components/shared/Navbar'
import React from 'react'
import { getAllProducts } from '@/lib/actions/product.action';
import { DataTable } from '@/components/DataTable';
import AddProductForm from '@/components/AddItemsModal';


const page = async () => {
  const allProductsDetailsResponse = await getAllProducts();
  if (allProductsDetailsResponse && allProductsDetailsResponse.statusCode !== 200) {
    return {
      notFound: true,
    };
  }
  const allProducts = allProductsDetailsResponse ? allProductsDetailsResponse.products : [];



  return (
    <>
      <div className="">
        <div className="">
          <Navbar />
        </div>
        <div className="">
          <AddProductForm />
        </div>
        <div className="">
          <DataTable data={allProducts} />
        </div>
      </div>
    </>
  );
}

export default page