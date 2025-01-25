import { Category } from "../models/category.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    // RETURN RESPONSE!
    res.status(200).json({ categories, success: true });
  } catch (error) {
    // RETURN RESPONSE!
    res.status(500).json({ message: "Failed to get all categories" });
  }
};
