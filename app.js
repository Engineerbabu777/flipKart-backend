import express from "express";
import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";

import dotenv from "dotenv";
import connectDB from "./config/connect.js";
import { buildAdminJS } from "./config/setup.js";

const app = express();
dotenv.config();
app.use(express.json());

// ROUTES!
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);

const start = async () => {
  // RUN SERVER!
  try {
    await connectDB(process.env.MONGO_URI);

    await buildAdminJS(app);

    app.listen({ port: 3000}, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
