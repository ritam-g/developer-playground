import express from "express";
import TransactionController from "../controllers/transaction.controller.js";

const router = express.Router();

/**
 * Route: POST /api/transactions
 * Create a new transaction
 */
router.post("/", TransactionController.createTransaction);

export default router;
