/**
 * Transaction controller.
 */
import TransactionService from "../services/transaction.service.js";
import ApiResponse from "../utils/apiResponse.js";

class TransactionController {
    /**
     * Create a new transaction.
     *
     * @param {import("express").Request} req - Express request object.
     * @param {import("express").Response} res - Express response object.
     * @returns {Promise<object>} JSON response.
     */
    static async createTransaction(req, res) {
        try {
            const payload = { ...req.body, userId: req.user.id };
            const transaction = await TransactionService.createTransaction(payload);
            return ApiResponse.success(res, 201, "Transaction created successfully.", transaction);
        } catch (error) {
            const statusCode = error.message.includes("not found") ? 404 : 400;
            return ApiResponse.error(res, statusCode, error.message);
        }
    }

    /**
     * Get all transactions.
     *
     * @param {import("express").Request} req - Express request object.
     * @param {import("express").Response} res - Express response object.
     * @returns {Promise<object>} JSON response.
     */
    static async getAllTransactions(req, res) {
        try {
            const queryParams = { ...req.query, userId: req.user.id };
            const data = await TransactionService.getAllTransactions(queryParams);
            return ApiResponse.success(res, 200, "Transactions fetched successfully.", data);
        } catch (error) {
            return ApiResponse.error(res, 500, error.message);
        }
    }

    /**
     * Get transaction by ID.
     *
     * @param {import("express").Request} req - Express request object.
     * @param {import("express").Response} res - Express response object.
     * @returns {Promise<object>} JSON response.
     */
    static async getTransactionById(req, res) {
        try {
            const transaction = await TransactionService.getTransactionById(req.params.id);
            if (!transaction) {
                return ApiResponse.error(res, 404, "Transaction not found.");
            }
            return ApiResponse.success(res, 200, "Transaction fetched successfully.", transaction);
        } catch (error) {
            return ApiResponse.error(res, 500, error.message);
        }
    }

    /**
     * Update transaction by ID.
     *
     * @param {import("express").Request} req - Express request object.
     * @param {import("express").Response} res - Express response object.
     * @returns {Promise<object>} JSON response.
     */
    static async updateTransaction(req, res) {
        try {
            const transaction = await TransactionService.updateTransaction(req.params.id, req.body);
            return ApiResponse.success(res, 200, "Transaction updated successfully.", transaction);
        } catch (error) {
            const statusCode = error.message.includes("not found") ? 404 : 400;
            return ApiResponse.error(res, statusCode, error.message);
        }
    }

    /**
     * Delete transaction by ID.
     *
     * @param {import("express").Request} req - Express request object.
     * @param {import("express").Response} res - Express response object.
     * @returns {Promise<object>} JSON response.
     */
    static async deleteTransaction(req, res) {
        try {
            await TransactionService.deleteTransaction(req.params.id);
            return ApiResponse.success(res, 200, "Transaction deleted successfully.");
        } catch (error) {
            const statusCode = error.message.includes("not found") ? 404 : 500;
            return ApiResponse.error(res, statusCode, error.message);
        }
    }
}

export default TransactionController;
