/**
 * Report service.
 *
 * Responsibilities:
 * - Handle complex reporting and aggregation logic.
 * - Call Sequelize aggregate functions (sum, count, min, max, etc.).
 */
import { Transaction, Category, User } from "../models/index.js";
import { Sequelize } from "sequelize";

class ReportService {
    /**
     * Guard: Validates that userId is provided.
     * Called at the start of every report method.
     *
     * @param {*} userId
     */
    static #requireUserId(userId) {
        if (!userId) {
            throw new Error("userId is required to fetch reports.");
        }
    }

    // ─────────────────────────────────────────────────────────
    // DASHBOARD SUMMARY
    // ─────────────────────────────────────────────────────────

    /**
     * Get Dashboard Summary (Total Income, Total Expense, Balance).
     *
     * SQL equivalent:
     * SELECT SUM(amount) FROM transactions WHERE userId = ? AND type = 'income';
     * SELECT SUM(amount) FROM transactions WHERE userId = ? AND type = 'expense';
     *
     * @param {number|string} userId - ID of the user requesting the report.
     * @returns {Promise<object>}
     */
    static async getDashboardSummary(userId) {
        ReportService.#requireUserId(userId);

        // Transaction.sum() returns null when there are no records → fallback to 0
        const totalIncome = (await Transaction.sum("amount", {
            where: { userId, type: "income" }
        })) || 0;

        const totalExpense = (await Transaction.sum("amount", {
            where: { userId, type: "expense" }
        })) || 0;

        const balance = parseFloat(totalIncome) - parseFloat(totalExpense);

        return {
            totalIncome: parseFloat(totalIncome),
            totalExpense: parseFloat(totalExpense),
            balance: parseFloat(balance.toFixed(2))
        };
    }

    // ─────────────────────────────────────────────────────────
    // CATEGORY-WISE EXPENSE
    // ─────────────────────────────────────────────────────────

    /**
     * Get Category-wise Expense breakdown.
     *
     * SQL equivalent:
     * SELECT c.name AS categoryName, SUM(t.amount) AS totalAmount
     * FROM transactions t
     * JOIN categories c ON t.categoryId = c.id
     * WHERE t.userId = ? AND t.type = 'expense'
     * GROUP BY t.categoryId, c.id;
     *
     * @param {number|string} userId - ID of the user.
     * @returns {Promise<Array>} Array of objects with categoryName and totalAmount.
     */
    static async getCategoryExpense(userId) {
        ReportService.#requireUserId(userId);

        const results = await Transaction.findAll({
            where: { userId, type: "expense" },
            attributes: [
                "categoryId",
                [Sequelize.fn("SUM", Sequelize.col("Transaction.amount")), "totalAmount"]
            ],
            include: [
                {
                    model: Category,
                    attributes: ["name"]
                }
            ],
            group: ["Transaction.categoryId", "Category.id"],
            order: [[Sequelize.literal("totalAmount"), "DESC"]]
        });

        return results.map(item => ({
            categoryName: item.Category.name,
            totalAmount: parseFloat(item.getDataValue("totalAmount"))
        }));
    }

    // ─────────────────────────────────────────────────────────
    // MONTHLY TRENDS
    // ─────────────────────────────────────────────────────────

    /**
     * Get Monthly Income & Expense trends for a given year.
     *
     * SQL equivalent:
     * SELECT MONTH(transactionDate) AS month, type, SUM(amount) AS totalAmount
     * FROM transactions
     * WHERE userId = ? AND YEAR(transactionDate) = ?
     * GROUP BY MONTH(transactionDate), type;
     *
     * @param {number|string} userId
     * @param {number} year - e.g. 2025
     * @returns {Promise<Array>}
     */
    static async getMonthlyTrends(userId, year) {
        ReportService.#requireUserId(userId);

        const targetYear = year || new Date().getFullYear();

        const results = await Transaction.findAll({
            where: {
                userId,
                [Sequelize.Op.and]: [
                    Sequelize.where(
                        Sequelize.fn("YEAR", Sequelize.col("transactionDate")),
                        targetYear
                    )
                ]
            },
            attributes: [
                [Sequelize.fn("MONTH", Sequelize.col("transactionDate")), "month"],
                "type",
                [Sequelize.fn("SUM", Sequelize.col("amount")), "totalAmount"]
            ],
            group: [
                Sequelize.fn("MONTH", Sequelize.col("transactionDate")),
                "type"
            ],
            order: [[Sequelize.literal("month"), "ASC"]]
        });

        // Build a clean 12-month structure
        const months = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            income: 0,
            expense: 0
        }));

        results.forEach(item => {
            const monthIndex = parseInt(item.getDataValue("month")) - 1;
            const amount = parseFloat(item.getDataValue("totalAmount"));
            const type = item.type;

            if (type === "income") months[monthIndex].income = amount;
            if (type === "expense") months[monthIndex].expense = amount;
        });

        return { year: targetYear, months };
    }

    // ─────────────────────────────────────────────────────────
    // RECENT TRANSACTIONS
    // ─────────────────────────────────────────────────────────

    /**
     * Get the most recent transactions for a user.
     *
     * SQL equivalent:
     * SELECT t.*, c.name
     * FROM transactions t
     * JOIN categories c ON t.categoryId = c.id
     * WHERE t.userId = ?
     * ORDER BY t.transactionDate DESC
     * LIMIT ?;
     *
     * @param {number|string} userId
     * @param {number} limit - Number of records to fetch (default: 5)
     * @returns {Promise<Array>}
     */
    static async getRecentTransactions(userId, limit = 5) {
        ReportService.#requireUserId(userId);

        const transactions = await Transaction.findAll({
            where: { userId },
            include: [
                { model: Category, attributes: ["id", "name", "type"] },
                { model: User, attributes: ["id", "name"] }
            ],
            order: [["transactionDate", "DESC"]],
            limit: parseInt(limit)
        });

        return transactions;
    }

    // ─────────────────────────────────────────────────────────
    // HIGHEST & LOWEST EXPENSE
    // ─────────────────────────────────────────────────────────

    /**
     * Get the single highest expense transaction.
     *
     * SQL equivalent:
     * SELECT * FROM transactions
     * WHERE userId = ? AND type = 'expense'
     * ORDER BY amount DESC LIMIT 1;
     *
     * @param {number|string} userId
     * @returns {Promise<Transaction|null>}
     */
    static async getHighestExpense(userId) {
        ReportService.#requireUserId(userId);

        return Transaction.findOne({
            where: { userId, type: "expense" },
            include: [{ model: Category, attributes: ["id", "name"] }],
            order: [["amount", "DESC"]]
        });
    }

    /**
     * Get the single lowest expense transaction.
     *
     * SQL equivalent:
     * SELECT * FROM transactions
     * WHERE userId = ? AND type = 'expense'
     * ORDER BY amount ASC LIMIT 1;
     *
     * @param {number|string} userId
     * @returns {Promise<Transaction|null>}
     */
    static async getLowestExpense(userId) {
        ReportService.#requireUserId(userId);

        return Transaction.findOne({
            where: { userId, type: "expense" },
            include: [{ model: Category, attributes: ["id", "name"] }],
            order: [["amount", "ASC"]]
        });
    }

    // ─────────────────────────────────────────────────────────
    // TOP SPENDING CATEGORIES
    // ─────────────────────────────────────────────────────────

    /**
     * Get Top N spending categories by total expense amount.
     *
     * SQL equivalent:
     * SELECT c.name, SUM(t.amount) AS totalAmount, COUNT(t.id) AS transactionCount
     * FROM transactions t
     * JOIN categories c ON t.categoryId = c.id
     * WHERE t.userId = ? AND t.type = 'expense'
     * GROUP BY t.categoryId
     * ORDER BY totalAmount DESC
     * LIMIT ?;
     *
     * @param {number|string} userId
     * @param {number} limit - Top N categories (default: 5)
     * @returns {Promise<Array>}
     */
    static async getTopSpendingCategories(userId, limit = 5) {
        ReportService.#requireUserId(userId);

        const results = await Transaction.findAll({
            where: { userId, type: "expense" },
            attributes: [
                "categoryId",
                [Sequelize.fn("SUM", Sequelize.col("Transaction.amount")), "totalAmount"],
                [Sequelize.fn("COUNT", Sequelize.col("Transaction.id")), "transactionCount"]
            ],
            include: [
                { model: Category, attributes: ["name"] }
            ],
            group: ["Transaction.categoryId", "Category.id"],
            order: [[Sequelize.literal("totalAmount"), "DESC"]],
            limit: parseInt(limit)
        });

        return results.map(item => ({
            categoryName: item.Category.name,
            totalAmount: parseFloat(item.getDataValue("totalAmount")),
            transactionCount: parseInt(item.getDataValue("transactionCount"))
        }));
    }
}

export default ReportService;
