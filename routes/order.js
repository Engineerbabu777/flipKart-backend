



import express from "express";
import { createTransaction } from "../controllers/order";

const router = express.Router();

router.post("/", createOrder)
router.post("/transaction", createTransaction)


export default router;