'use client'
import React from "react";
import Navbar from "@/components/shared/Navbar";
import { useCart } from "@/context/CartContext";


const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div>
                  <h2>{item.name}</h2>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default CartPage;