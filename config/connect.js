import mongoose from "mongoose";

const connectDB = async (url) => {
  return mongoose.connect(url).then(() => {
    console.log("connected to db");
  });
};

export default connectDB;
