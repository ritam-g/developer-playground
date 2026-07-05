import express from "express";
import TransactionController from "../controllers/transaction.controller.js";

const router = express.Router();

/**
 * Route: POST /api/transactions
 * Create a new transaction
 */
router.post("/", TransactionController.createTransaction);

/**
 * Route: GET /api/transactions
 * Get all transactions (with filtering, sorting, pagination, search)
 */
router.get("/", TransactionController.getAllTransactions);

/**
 * Route: GET /api/transactions/:id
 * Get transaction by ID
 */
router.get("/:id", TransactionController.getTransactionById);

/**
 * Route: PUT /api/transactions/:id
 * Update transaction by ID
 */
router.put("/:id", TransactionController.updateTransaction);

/**
 * Route: DELETE /api/transactions/:id
 * Delete transaction by ID
 */
router.delete("/:id", TransactionController.deleteTransaction);

export default router;
