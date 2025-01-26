import connectDB from "./config/connect.js";
import { Category } from "./models/category.js";
import { Product } from "./models/product.js";
import { categoriesData, productData } from "./seedData.js";
import mongoose from "mongoose";

import dotenv from "dotenv"
dotenv.config()
async function seedData() {
  try {
    await connectDB(process.env.MONGO_URI);

    await Product.deleteMany({});
    await Category.deleteMany({});

    const categoryDocs = await Category.insertMany(categoriesData);

    const categoryMap = categoryDocs.reduce((acc, category) => {
      acc[category.name] = category._id;
      return acc;
    });

    const productWithCategoryIds = productData.map((product) => {
      return {
        ...product,
        category: categoryMap[product.category],
      };
    });

    await Product.insertMany(productWithCategoryIds);

    console.log("Seeded success!");
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Seeding data completed");
    mongoose.connection.close();
  }
}

seedData();
