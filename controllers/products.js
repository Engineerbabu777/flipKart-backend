import { Product } from "../models/product.js";

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId });

    // IF NO PRODUCTS FOUND OR LENGTH IS ZERO!
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in this category", error: true });
    }

    // RETURN RESPONSE!
    res.status(200).json({ products, success: true });
  } catch (error) {
    // RETURN RESPONSE!
    res.status(500).json({ message: error.message });
  }
};
