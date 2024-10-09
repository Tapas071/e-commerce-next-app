// "use client";
// import { removeFromCart } from "@/redux/features/cart/cartSliceActual";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import React from "react";

// const ShowCartItems = () => {
//   const cartItems = useAppSelector((state) => state.cartAct.items);
//   const dispatch = useAppDispatch();
//   return (
//     <>
//       <div className="container">
//         <h1>Shopping Cart</h1>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <ul>
//             {cartItems.map((item) => (
//               <li key={item.id}>
//                 <div>
//                   <h2>{item.name}</h2>
//                   <p>Price: ${item.price}</p>
//                   <p>Quantity: {item.quantity}</p>
//                   <button onClick={() => dispatch(removeFromCart(item.id))}>
//                     Remove
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </>
//   );
// };

// export default ShowCartItems;

"use client"
import React from "react";
import { removeFromCart } from "@/redux/features/cart/cartSliceActual";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const ShowCartItems = () => {
  const cartItems = useAppSelector((state) => state.cartAct.items);
  const dispatch = useAppDispatch();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <Card className="bg-card text-card-foreground">
          <CardContent className="p-6">
            <p className="text-lg text-muted-foreground">Your cart is empty.</p>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.id}>
              <Card className="bg-card text-card-foreground">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold">
                    {item.name}
                  </CardTitle>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="h-8 w-8"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">
                      Price:{" "}
                      <span className="text-primary font-semibold">
                        ${item.price.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-muted-foreground">
                      Quantity:{" "}
                      <span className="text-primary font-semibold">
                        {item.quantity}
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowCartItems;
