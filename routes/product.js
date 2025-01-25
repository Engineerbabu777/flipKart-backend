



import express from "express";
import { getProductsByCategory } from "../controllers/products.js";

const router = express.Router();

router.post("/:category", getProductsByCategory)


export default router;