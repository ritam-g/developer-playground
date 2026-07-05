/**
 * Transaction service.
 *
 * Responsibilities:
 * - Handle business logic for Transactions.
 * - Interact with the database.
 */
import { Transaction, User, Category } from "../models/index.js";

class TransactionService {
    /**
     * Create a new transaction.
     *
     * SQL equivalent:
     * INSERT INTO transactions (...) VALUES (...);
     *
     * @param {object} data - Transaction data.
     * @returns {Promise<Transaction>} The created transaction.
     */
    static async createTransaction(data) {
        // 1. Verify User exists
        const user = await User.findByPk(data.userId);
        if (!user) {
            throw new Error("User not found.");
        }

        // 2. Verify Category exists
        const category = await Category.findByPk(data.categoryId);
        if (!category) {
            throw new Error("Category not found.");
        }

        // 3. Create Transaction
        const transaction = await Transaction.create(data);
        return transaction;
    }
}

export default TransactionService;
