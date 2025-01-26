



import express from "express";
import { getProductsByCategory } from "../controllers/products.js";

const router = express.Router();

router.get("/:categoryId", getProductsByCategory)


export default router;