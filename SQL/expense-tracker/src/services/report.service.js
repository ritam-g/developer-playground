/**
 * Report service.
 *
 * Responsibilities:
 * - Handle complex reporting and aggregation logic.
 * - Call Sequelize aggregate functions (sum, count, etc.).
 */
import { Transaction, Category } from "../models/index.js";
import { Sequelize } from "sequelize";

class ReportService {
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
        if (!userId) {
            throw new Error("userId is required to fetch reports.");
        }

        // 1. Calculate total income
        // Using Sequelize sum(). It returns null if there are no records, so we fallback to 0.
        const totalIncome = await Transaction.sum("amount", {
            where: { userId, type: "income" }
        }) || 0;

        // 2. Calculate total expense
        const totalExpense = await Transaction.sum("amount", {
            where: { userId, type: "expense" }
        }) || 0;

        // 3. Calculate balance
        const balance = totalIncome - totalExpense;

        return {
            totalIncome,
            totalExpense,
            balance
        };
    }
    /**
     * Get Category-wise Expense breakdown.
     *
     * SQL equivalent:
     * SELECT c.name AS categoryName, SUM(t.amount) AS totalAmount
     * FROM transactions t
     * JOIN categories c ON t.categoryId = c.id
     * WHERE t.userId = ? AND t.type = 'expense'
     * GROUP BY t.categoryId;
     *
     * @param {number|string} userId - ID of the user.
     * @returns {Promise<Array>} Array of objects with categoryName and totalAmount.
     */
    static async getCategoryExpense(userId) {
        if (!userId) {
            throw new Error("userId is required to fetch reports.");
        }

        const categoryExpenses = await Transaction.findAll({
            where: { userId, type: "expense" },
            attributes: [
                "categoryId",
                [Sequelize.fn("SUM", Sequelize.col("amount")), "totalAmount"]
            ],
            include: [
                {
                    model: Category,
                    attributes: ["name"]
                }
            ],
            group: ["categoryId", "Category.id"] // MySQL sometimes requires grouped joined columns
        });

        // Format the output for the frontend
        return categoryExpenses.map(item => ({
            categoryName: item.Category.name,
            totalAmount: item.getDataValue("totalAmount")
        }));
    }
}

export default ReportService;
