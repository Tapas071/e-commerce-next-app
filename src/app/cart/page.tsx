import React from "react";
import Navbar from "@/components/shared/Navbar";
import ShowCartItems from "@/components/showCartItems";
const CartPage = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <ShowCartItems />
    </>
  );
};

export default CartPage;
