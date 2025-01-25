import express from "express";
import userRoutes from "./routes/user.js";
import dotenv from 'dotenv';

const app = express();
dotenv.config();
app.use(express.json());

// ROUTES!
app.use("/user", userRoutes);

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
