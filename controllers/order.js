import RazorPay from "razorpay";
import crypto from "crypto";
import Transaction from "../models/transaction";
import Order from "../models/order";

export const createTransaction = async (req, res) => {
  try {
    const { amount, userId } = req.body;

    const razor = new RazorPay({
      key_id: process.env.RAZOR_PAY_KEY_ID,
      key_secret: process.env.RAZOR_PAY_KEY_SECRET,
    });

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt#${Date.now()}`,
    };

    // IF NO AMOUNT && USERID!
    if (!amount || !userId) {
      // RETURN RESPONSE ABOUT IT!
      res.status(400).send({
        success: false,
        message: "Amount and userid is required!",
      });
    }

    const razorpayOrder = await razor.orders.create(options);

    // RETURN RESPONSE THAT ORDER CREATED!
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      key: process.env.RAZOR_PAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      order_id: razorpayOrder.id,
    });
  } catch (error) {
    // RETURN ERROR WITH SUCCESS!
    return res.status(500).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      cartItems,
      address,
      deliveryDate,
    } = req.body;

    const key_secret = process.env.RAZOR_PAY_KEY_SECRET;

    const generated_signature = crypto
      .createHmac("sha256", key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment validation failed" });
    }

    const transaction = await Transaction.create({
      user: userId,
      cartItems,
      address,
      deliveryDate,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      status: "Success",
      amount: cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    });

    const order = await Order.create({
      user: userId,
      address,
      deliveryDate,
      items: cartItems?.map((item) => ({
        product: item?.productId,
        quantity: item?.quantity,
      })),
      status: "Order Placed",
    });

    transaction.order = order._id;
    await transaction.save();

    res
      .status(200)
      .json({ message: "Order placed successfully", success: true });
  } catch (error) {
    // RETURN ERROR WITH SUCCESS!
    return res
      .status(500)
      .json({ message: error.message, error: true, status: "Failed" });
  }
};

export const getOrdersByUserId = async (req, res) => {
  try {
    const { userid } = req.params;

    const orders = await Order.find({ user: userid })
      .populate("user", "name email")
      .populate("items.product", "name price image_uri ar_uri")
      .sort({ createdAt: -1 });

    // IF NO ORDERS!
    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found", success: false });
    }

    // RETURN ORDERS!
    res.status(200).json({ success: true, orders });
  } catch (error) {
    // RETURN ERROR WITH SUCCESS!
    return res.status(500).json({
      message: "Failed getting Orders by user_id",
      success: false,
      error: error.message,
    });
  }
};
