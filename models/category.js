import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image_uri: {
      type: String,
      required: true,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // reference to the Product model
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category", CategorySchema);
