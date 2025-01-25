import mongoose from "mongoose";

// CREATE ITEM SCHEMA!
const itemsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// CREATE ORDER SCHEMA!
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: { type: [itemsSchema], required: true },
    total: {
      type: Number,
      required: true,
    },
    deliveryDate: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Order Placed", "Shipping", "Out for Delivery", "Cancelled"],
      default: "Order Placed",
      required: true,
    },

  },
  {
    timestamps: true,
  }
);


const Order = mongoose.model("Order", orderSchema);
export default Order;
