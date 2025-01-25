import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const generateTokens = (user) => {
  // logic for generating tokens goes here
  const accessToken = jwt.sign({ user }, "123qwe123qwe", {
    expiresIn: "2d",
  });
  const refreshToken = jwt.sign({ user }, "123qwe123qwe", {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export const loginOrSignUp = async (req, res) => {
  // logic for login or signup goes here

  try {
    const { phone, address } = req.body;

    // FIND THE USER!
    const user = await User.findOne({ phone });

    // IF USER NOT EXISTS!
    if (!user) {
      // CREATE NEW USER
      const newUser = new User({ phone, address });
      await newUser.save();
      res.status(201).json({ user: newUser });
    } else {
      user.address = address;
      await user.save();
    }

    const { accessToken, refreshToken } = generateTokens(user.toObject());

    res.status(200).json({ user, accessToken, refreshToken });
  } catch (error) {
    // RETURN ERROR
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
