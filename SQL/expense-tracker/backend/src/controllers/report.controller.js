/**
 * Report controller.
 *
 * Responsibilities:
 * - Extract query parameters from HTTP requests.
 * - Call Report Service methods.
 * - Format and return JSON responses using ApiResponse.
 */
import ReportService from "../services/report.service.js";
import ApiResponse from "../utils/apiResponse.js";

class ReportController {
    /**
     * Get Dashboard Summary (Total Income, Total Expense, Balance).
     *
     * GET /api/reports/summary?userId=1
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static async getDashboardSummary(req, res) {
        try {
            const userId = req.user.id;
            const summary = await ReportService.getDashboardSummary(userId);
            return ApiResponse.success(res, 200, "Dashboard summary fetched successfully.", summary);
        } catch (error) {
            return ApiResponse.error(res, 400, error.message);
        }
    }

    /**
     * Get Category-wise Expense breakdown.
     *
     * GET /api/reports/category-expense?userId=1
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static async getCategoryExpense(req, res) {
        try {
            const userId = req.user.id;
            const data = await ReportService.getCategoryExpense(userId);
            return ApiResponse.success(res, 200, "Category expenses fetched successfully.", data);
        } catch (error) {
            return ApiResponse.error(res, 400, error.message);
        }
    }

    /**
     * Get Monthly Income & Expense trends.
     *
     * GET /api/reports/monthly-trends?userId=1&year=2025
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static async getMonthlyTrends(req, res) {
        try {
            const userId = req.user.id;
            const { year } = req.query;
            const data = await ReportService.getMonthlyTrends(userId, year);
            return ApiResponse.success(res, 200, "Monthly trends fetched successfully.", data);
        } catch (error) {
            return ApiResponse.error(res, 400, error.message);
        }
    }

    /**
     * Get Recent Transactions.
     *
     * GET /api/reports/recent?userId=1&limit=5
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static async getRecentTransactions(req, res) {
        try {
            const userId = req.user.id;
            const { limit } = req.query;
            const data = await ReportService.getRecentTransactions(userId, limit);
            return ApiResponse.success(res, 200, "Recent transactions fetched successfully.", data);
        } catch (error) {
            return ApiResponse.error(res, 400, error.message);
        }
    }

    /**
     * Get Highest Expense transaction.
     *
     * GET /api/reports/highest-expense?userId=1
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static async getHighestExpense(req, res) {
        try {
            const userId = req.user.id;
            const data = await ReportService.getHighestExpense(userId);
            return ApiResponse.success(res, 200, "Highest expense fetched successfully.", data);
        } catch (error) {
            return ApiResponse.error(res, 400, error.message);
        }
    }

    /**
     * Get Lowest Expense transaction.
     *
     * GET /api/reports/lowest-expense?userId=1
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static async getLowestExpense(req, res) {
        try {
            const userId = req.user.id;
            const data = await ReportService.getLowestExpense(userId);
            return ApiResponse.success(res, 200, "Lowest expense fetched successfully.", data);
        } catch (error) {
            return ApiResponse.error(res, 400, error.message);
        }
    }

    /**
     * Get Top Spending Categories.
     *
     * GET /api/reports/top-categories?userId=1&limit=5
     *
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    static async getTopSpendingCategories(req, res) {
        try {
            const userId = req.user.id;
            const { limit } = req.query;
            const data = await ReportService.getTopSpendingCategories(userId, limit);
            return ApiResponse.success(res, 200, "Top spending categories fetched successfully.", data);
        } catch (error) {
            return ApiResponse.error(res, 400, error.message);
        }
    }
}

export default ReportController;
