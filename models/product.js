import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image_uri: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ar_uri: {
      typeof: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Category", productSchema);
Í;
