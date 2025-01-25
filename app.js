import express from "express";
import userRoutes from "./routes/user.js";

const app = express();

app.use(express.json());

// ROUTES!
app.use("/api/v1", userRoutes);

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
