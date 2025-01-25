import RazorPay from "razorpay";
import crypto from "crypto";

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
    
  } catch (error) {
    // RETURN ERROR WITH SUCCESS!
    return res.status(500).json({ message: error.message });
  }
};
