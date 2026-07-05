/**
 * Report service.
 *
 * Responsibilities:
 * - Handle complex reporting and aggregation logic.
 * - Call Sequelize aggregate functions (sum, count, etc.).
 */
import { Transaction } from "../models/index.js";

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
}

export default ReportService;
