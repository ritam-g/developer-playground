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
            const transaction = await TransactionService.createTransaction(req.body);
            return ApiResponse.success(res, 201, "Transaction created successfully.", transaction);
        } catch (error) {
            // Using 400 for validation errors or 500 for server errors
            const statusCode = error.message.includes("not found") ? 404 : 400;
            return ApiResponse.error(res, statusCode, error.message);
        }
    }
}

export default TransactionController;
