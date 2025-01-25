



import express from "express";
import { getProductsByCategory } from "../controllers/products.js";

const router = express.Router();

router.get("/:category", getProductsByCategory)


export default router;