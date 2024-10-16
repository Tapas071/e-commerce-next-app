import mongoose from "mongoose";

const fashionProductSchema = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: false,
      enum: [
        "Clothing",
        "Footwear",
        "Accessories",
        "Jewelry",
        "Bags",
        "Outerwear",
        "Sportswear",
        "Lingerie",
      ],
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, required: true },
      },
    ],
    sizes: { type: [String], required: true },
    colors: { type: [String], required: true },
    stock: { type: Number, required: true, min: 0 },
    brand: { type: String, required: true, trim: true },
    ratings: {
      average: { type: Number,  default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const FashionProductModel =
  mongoose.models.FashionProduct ||
  mongoose.model("FashionProduct", fashionProductSchema);

export default FashionProductModel;
