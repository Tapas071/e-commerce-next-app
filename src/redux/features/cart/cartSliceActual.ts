// features/cart/cartSlice.ts
import { CartItem, CartState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  items: [],
};

const cartSliceAct = createSlice({
  name: "cartAct",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
        // console.log("add to cart action trigger")
        // console.log(action.payload)
        state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSliceAct.actions;
export default cartSliceAct.reducer;
