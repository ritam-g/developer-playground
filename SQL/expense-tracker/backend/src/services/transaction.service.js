/**
 * Transaction service.
 *
 * Responsibilities:
 * - Handle business logic for Transactions.
 * - Interact with the database.
 */
import { Transaction, User, Category } from "../models/index.js";
import { Op } from "sequelize";

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

    /**
     * Get all transactions with filtering, sorting, pagination, searching, and associations.
     *
     * SQL equivalent:
     * SELECT t.*, u.name, c.name FROM transactions t 
     * JOIN users u ON t.userId = u.id 
     * JOIN categories c ON t.categoryId = c.id
     * WHERE ...
     * ORDER BY ...
     * LIMIT ... OFFSET ...;
     *
     * @param {object} queryParams - Query parameters from request.
     * @returns {Promise<object>} Object containing transactions and count.
     */
    static async getAllTransactions(queryParams) {
        const {
            page = 1,
            limit = 10,
            type,
            userId,
            categoryId,
            startDate,
            endDate,
            search,
            sortBy = "transactionDate",
            sortOrder = "DESC"
        } = queryParams;

        // Pagination calculations
        const offset = (parseInt(page) - 1) * parseInt(limit);
        const parsedLimit = parseInt(limit);

        // Building the WHERE clause
        const whereClause = {};

        if (type) whereClause.type = type;
        if (userId) whereClause.userId = userId;
        if (categoryId) whereClause.categoryId = categoryId;

        if (startDate || endDate) {
            whereClause.transactionDate = {};
            if (startDate) whereClause.transactionDate[Op.gte] = new Date(startDate);
            if (endDate) whereClause.transactionDate[Op.lte] = new Date(endDate);
        }

        if (search) {
            whereClause.title = { [Op.like]: `%${search}%` };
        }

        const { count, rows } = await Transaction.findAndCountAll({
            where: whereClause,
            order: [[sortBy, sortOrder.toUpperCase()]],
            limit: parsedLimit,
            offset: offset,
            include: [
                {
                    model: User,
                    attributes: ["id", "name", "email"] // Do not fetch passwords
                },
                {
                    model: Category,
                    attributes: ["id", "name", "type"]
                }
            ]
        });

        return {
            totalItems: count,
            totalPages: Math.ceil(count / parsedLimit),
            currentPage: parseInt(page),
            transactions: rows
        };
    }

    /**
     * Get transaction by ID with associations.
     *
     * @param {number|string} id - Transaction ID.
     * @returns {Promise<Transaction|null>}
     */
    static async getTransactionById(id) {
        const transaction = await Transaction.findByPk(id, {
            include: [
                { model: User, attributes: ["id", "name", "email"] },
                { model: Category, attributes: ["id", "name", "type"] }
            ]
        });
        return transaction;
    }

    /**
     * Update transaction by ID.
     *
     * @param {number|string} id - Transaction ID.
     * @param {object} data - Data to update.
     * @returns {Promise<Transaction>}
     */
    static async updateTransaction(id, data) {
        const transaction = await Transaction.findByPk(id);
        
        if (!transaction) {
            throw new Error("Transaction not found.");
        }

        // Validate foreign keys if they are being updated
        if (data.userId) {
            const user = await User.findByPk(data.userId);
            if (!user) throw new Error("User not found.");
        }

        if (data.categoryId) {
            const category = await Category.findByPk(data.categoryId);
            if (!category) throw new Error("Category not found.");
        }

        await transaction.update(data);
        return transaction;
    }

    /**
     * Delete transaction by ID.
     *
     * @param {number|string} id - Transaction ID.
     * @returns {Promise<Transaction>}
     */
    static async deleteTransaction(id) {
        const transaction = await Transaction.findByPk(id);

        if (!transaction) {
            throw new Error("Transaction not found.");
        }

        await transaction.destroy();
        return transaction;
    }
}

export default TransactionService;
