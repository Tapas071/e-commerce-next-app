import Navbar from '@/components/shared/Navbar'
import React from 'react'
import WhyNot from '@/components/AddItemsModal';
import { getAllProducts } from '@/lib/actions/product.action';
import { DataTable } from '@/components/DataTable';




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
            <WhyNot/>
        </div>
        <div className="">
          <DataTable data={allProducts} />
        </div>
      </div>
    </>
  );
}

export default page