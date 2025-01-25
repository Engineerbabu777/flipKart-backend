import express from "express";
import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";


import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(express.json());

// ROUTES!
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);


const start = async () => {
  // RUN SERVER!
  try {
    app.listen({ port: 3000, host: "0.0.0.0" }, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
