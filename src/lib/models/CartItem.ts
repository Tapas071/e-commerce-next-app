import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FashionProduct", // Reference to the FashionProduct model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Minimum quantity is 1
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const CartItemModel =
  mongoose.models.CartItem || mongoose.model("CartItem", cartItemSchema);

export default CartItemModel;
