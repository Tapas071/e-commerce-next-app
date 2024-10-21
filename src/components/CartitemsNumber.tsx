"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";

const CartItemCount = () => {
  // Get the cart items from the Redux store
  const cartItems = useAppSelector((state) => state.cartAct.items);

  // Calculate the total number of items in the cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {totalItems === 0 ? null : (
        <div className=" flex h-4 w-4 items-center justify-center rounded-full ">
          {/* <CartItemCount /> */}
          <div className="flex items-center space-x-2">
            <span className="text-primary text-xl font-bold text-white">
              {totalItems}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItemCount;
